/** @format */
import { inquirerMenu, pause } from './helpers/inquirer.js';

const main = async () => {
	let option;

	do {
		option = await inquirerMenu();
		await pause();
	} while (option !== 0);
};

main();
