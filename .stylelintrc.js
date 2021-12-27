module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		'prettier/prettier': true,
		// indentation: [4,'tab'],
		'plugin/declaration-block-no-ignored-properties': true,
		'comment-empty-line-before': null,
		'declaration-empty-line-before': null,
		'function-name-case': 'lower',
		'no-descending-specificity': null,
		'no-invalid-double-slash-comments': null,
		'rule-empty-line-before': false,
		// 'at-rule-whitelist': ['import', '@deepGreen'],
		// 'unit-whitelist': ['@fontSize', 'px', 'vh', 'vw']
	},
	ignoreFiles: ['node_modules/**/*', 'slbUser/**/*']
}
