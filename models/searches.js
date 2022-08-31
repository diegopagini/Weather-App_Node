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

	async searchCity(city = '') {
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
				params: this.mapboxParams,
			});

			const { data } = await instance.get();
			console.log(data);
		} catch (error) {
			return [];
		}
	}
}
