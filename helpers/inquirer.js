/** @format */
import 'colors';

import inquirer from 'inquirer';

// Using "type": "module" in package.json now we can use import from instead of require()

const questions = [
	// questions to show through inquirer.
	{
		type: 'list',
		name: 'option',
		message: '¿Qué desea hacer?',
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Buscar ciudad`,
			},
			{
				value: 2,
				name: `${'2.'.blue} Historial`,
			},
			{
				value: 0,
				name: `${'0.'.yellow} Salir`,
			},
		],
	},
];

const inquirerMenu = async () => {
	console.clear();
	console.log('==========================='.green);
	console.log('   Seleccione una opción'.yellow);
	console.log('===========================\n'.green);

	const { option } = await inquirer.prompt(questions);
	return option;
};

const pause = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Presione ${'ENTER'.green} para continuar`,
		},
	];
	console.log('\n');
	await inquirer.prompt(question);
};

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) return 'Por favor ingrese un valor';
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const citiesToShow = async (cities = []) => {
	const choices = cities.map((city, index) => ({
		value: city.id,
		name: `${(index + 1 + '.').green} ${city.name}`,
	}));

	choices.unshift({ value: 0, name: '0.'.yellow + ' Cancelar' });

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Seleccione lugar:',
			choices,
		},
	];

	const { id } = await inquirer.prompt(questions);
	return id;
};

export { inquirerMenu, pause, readInput, citiesToShow };
// Another way to export. Avoiding the use of export in const and using it this way.
