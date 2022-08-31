/** @format */
import axios from 'axios';
import fs from 'fs';

export class Searches {
	constructor() {
		// In JS we can create properties in the constructor without been previously declared.
		this.history = [];
		this.dbPath = './db/database.json';
		this.readDB();
	}

	get mapboxParams() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 5,
			language: 'es',
		};
	}

	get openWeatherParams() {
		return {
			appid: process.env.OPENWEATHER_KEY,
			units: 'metric',
			lang: 'es',
		};
	}

	get formattedHistory() {
		return this.history.map((city) => {
			let words = city.split(' ');
			words = words.map((word) => word[0].toUpperCase() + word.substring(1));
			return words.join(' ');
		});
	}

	async searchCity(city = '') {
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
				params: this.mapboxParams,
			});
			const { data } = await instance.get();

			return data.features.map((place) => ({
				id: place.id,
				name: place.place_name,
				lng: place.center[0],
				lat: place.center[1],
			}));
		} catch (error) {
			return [];
		}
	}

	async getWeather(lat = '', lon = '') {
		try {
			const instance = axios.create({
				baseURL: `https://api.openweathermap.org/data/2.5/weather`,
				params: {
					...this.openWeatherParams,
					lat,
					lon,
				},
			});

			const { data } = await instance.get();
			const { weather, main } = data;

			return {
				description: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp,
			};
		} catch (error) {
			console.log(error);
		}
	}

	addToHistory(city = '') {
		// If the city already exist in our array:
		if (this.history.includes(city.toLocaleLowerCase())) return;
		// If not we added it to the list.
		this.history.unshift(city.toLocaleLowerCase());
		// To save in our local .json
		this.saveDB();
	}

	saveDB() {
		const payload = {
			history: this.history,
		};
		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}

	readDB() {
		if (!fs.existsSync(this.dbPath)) return;
		// If the file exist.
		const file = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
		const { history } = JSON.parse(file);
		this.history = history;
	}
}
