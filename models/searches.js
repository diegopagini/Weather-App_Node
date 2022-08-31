/** @format */
import axios from 'axios';

export class Searches {
	constructor() {
		// In JS we can create properties in the constructor without been previously declared.
		this.history = [];
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

			const response = await instance.get();
			const { weather, main } = response.data;

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
}
