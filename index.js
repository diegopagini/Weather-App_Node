/** @format */
import 'colors';

import { config } from 'dotenv';

import { citiesToShow, inquirerMenu, pause, readInput } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

config(); // To use local environment variables in node.

const main = async () => {
	const search = new Searches();
	let option;

	do {
		option = await inquirerMenu();

		switch (option) {
			case 1:
				// Show message
				const city = await readInput('\nCiudad: ');
				// Search cities
				const cities = await search.searchCity(city);
				// Select city
				const id = await citiesToShow(cities);
				// If no city is selected "continue" to skip the rest of the code.
				if (id === 0) continue;
				// Selected city
				const selectedCity = cities.find((city) => city.id === id);
				// Save on history
				search.addToHistory(selectedCity.name);
				// Get weather
				const weather = await search.getWeather(selectedCity.lat, selectedCity.lng);
				// Show weather
				if (selectedCity) {
					console.clear();
					console.log('\nInformación de la ciudad\n'.green);
					console.log('Ciudad: ', selectedCity.name.yellow);
					console.log('Lat: ', selectedCity.lat);
					console.log('Lng: ', selectedCity.lng);
					console.log('Temperatura: ', weather.temp);
					console.log('Mínima: ', weather.min);
					console.log('Máxima: ', weather.max);
					console.log('Clima: ', weather.description.yellow);
				}
				break;

			case 2:
				search.history.forEach((city, i) => {
					const index = `${i + 1}.`.green;
					console.log(`${index} ${city}`);
				});
				break;
		}

		if (option !== 0) await pause(); // The pause is going to be shown only if the selected option is not "go out".
	} while (option !== 0);
};

main();
