import antfu from '@antfu/eslint-config'

export default antfu({
	formatters: false,
	stylistic: false,
	react: true,
	rules: {
		// 'antfu/no-top-level-await': 'off', // Allow top-level await
		'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
		'unused-imports/no-unused-vars': 'warn',
		'unused-imports/no-unused-imports': 'warn',
		'no-console': 'warn',

		'react-refresh/only-export-components': 'off',
		// 'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
		// TODO: temporary disable needs to refactor comopent with this warn
	},
})
