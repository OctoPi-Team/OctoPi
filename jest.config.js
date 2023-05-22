/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/__test__/**/*.(ts|tsx|js)'],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	globals: {
		IS_REACT_ACT_ENVIRONMENT: true,
	},
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				includeFailureMsg: true,
				pageTitle: 'Unit Tests OctoPi',
			},
		],
	],
};
