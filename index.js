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
				// Selected city
				const selectedCity = cities.find((city) => city.id === id);

				if (selectedCity) {
					console.log('\nInformación de la ciudad\n'.green);
					console.log('Ciudad: ', selectedCity.name);
					console.log('Lat: ', selectedCity.lat);
					console.log('Lng: ', selectedCity.lng);
					console.log('Temperatura:');
					console.log('Mínima:');
					console.log('Máxima:');
				}
				break;

			case 2:
				break;
		}

		if (option !== 0) await pause(); // The pause is going to be shown only if the selected option is not "go out".
	} while (option !== 0);
};

main();
