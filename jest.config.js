/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/__test__/**/*.(ts|tsx|js)'],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	reporters: [
		'default',
		[
			'./node_modules/jest-html-reporter',
			{
				pageTitle: 'Test Report',
			},
		],
	],
};
