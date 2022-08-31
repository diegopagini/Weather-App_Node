/** @format */
import 'colors';

import { config } from 'dotenv';

import { inquirerMenu, pause, readInput } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

config(); // To use local environment variables in node.

const main = async () => {
	const search = new Searches();
	let option;

	do {
		option = await inquirerMenu();

		switch (option) {
			case 1:
				const city = await readInput('\nCiudad: ');
				await search.searchCity(city);

				console.log('\nInformación de la ciudad\n'.green);
				console.log('Ciudad:');
				console.log('Lat:');
				console.log('Lng:');
				console.log('Temperatura:');
				console.log('Mínima:');
				console.log('Máxima:');

				break;

			case 2:
				break;
		}

		if (option !== 0) await pause(); // The pause is going to be shown only if the selected option is not "go out".
	} while (option !== 0);
};

main();
