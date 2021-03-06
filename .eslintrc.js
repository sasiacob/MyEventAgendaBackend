module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ["airbnb-base", "prettier"],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module",
	},
	rules: {
		"import/prefer-default-export": "off",
		"no-underscore-dangle": "off",
	},
};
