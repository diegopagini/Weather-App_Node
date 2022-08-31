/** @format */
import { readInput } from './helpers/inquirer.js';

const main = async () => {
	const text = await readInput('hola mundo');
	console.log(text);
};

main();
