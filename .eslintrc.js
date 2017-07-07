module.exports = {
	'parserOptions': {
		'ecmaVersion': 6,
		'sourceType': 'module'
	},
	'env': {
		'browser': true,
		'node': true,
		'es6': true
	},
	'plugins': [],
	'rules': {
		// Possible Errors
		'no-await-in-loop': 'error',
		'no-cond-assign': ['error', 'always'],
		'no-console': 'off',
		'no-constant-condition': 'error',
		'no-control-regex': 'error',
		'no-debugger': 'error',
		'no-dupe-args': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-empty-character-class': 'error',
		'no-empty': 'error',
		'no-ex-assign': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-parens': 'off',
		'no-extra-semi': 'error',
		'no-func-assign': 'error',
		'no-inner-declarations': 'error',
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': ['error', {
			'skipStrings': true,
			'skipComments': true,
			'skipTemplates': true
		}],
		'no-obj-calls': 'error',
		'no-prototype-builtins': 'off',
		'no-regex-spaces': 'error',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-unexpected-multiline': 'error',
		'no-unreachable': 'error',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'use-isnan': 'error',
		'valid-jsdoc': 'error',
		'valid-typeof': 'error',
		// Best Practices
		'accessor-pairs': 'error',
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'class-methods-use-this': 'error',
		'complexity': ['error', {
			'max': 5
		}],
		'consistent-return': 'error',
		'curly': ['error', 'multi-line'],
		'default-case': 'error',
		'dot-location': 'off',
		'dot-notation': 'off',
		'eqeqeq': 'error',
		'guard-for-in': 'off',
		'no-alert': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-div-regex': 'error',
		'no-else-return': 'error',
		'no-empty-function': 'error',
		'no-empty-pattern': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-fallthrough': 'error',
		'no-floating-decimal': 'error',
		'no-global-assign': 'error',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-labels': 'off',
		'no-lone-blocks': 'error',
		'no-loop-func': 'error',
		'no-magic-numbers': 'off',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-new': 'error',
		'no-octal-escape': 'error',
		'no-octal': 'error',
		'no-param-reassign': 'error',
		'no-proto': 'error',
		'no-redeclare': 'error',
		'no-restricted-properties': 'error',
		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unused-expressions': 'error',
		'no-unused-labels': 'error',
		'no-useless-call': 'error',
		'no-useless-concat': 'error',
		'no-useless-escape': 'error',
		'no-useless-return': 'error',
		'no-void': 'error',
		'no-warning-comments': 'off',
		'no-with': 'error',
		'prefer-promise-reject-errors': 'error',
		'radix': 'error',
		'require-await': 'error',
		'vars-on-top': 'error',
		'wrap-iife': 'error',
		'yoda': 'error',
		// Strict Mode
		'strict': 'off',
		// Variables
		'init-declarations': 'error',
		'no-catch-shadow': 'error',
		'no-delete-var': 'off',
		'no-label-var': 'error',
		'no-restricted-globals': 'error',
		'no-shadow-restricted-names': 'error',
		'no-shadow': 'error',
		'no-undef-init': 'error',
		'no-undef': 'error',
		'no-undefined': 'error',
		'no-unused-vars': 'error',
		'no-use-before-define': 'error',
		// Node.js and CommonJS
		'callback-return': 'error',
		'global-require': 'error',
		'handle-callback-err': 'error',
		'no-mixed-requires': 'error',
		'no-new-require': 'off',
		'no-path-concat': 'error',
		'no-process-env': 'off',
		'no-process-exit': 'off',
		'no-restricted-modules': 'off',
		'no-sync': 'off',
		// Stylistic Issues
		'array-bracket-spacing': 'off',
		'block-spacing': 'off',
		'brace-style': ['error', '1tbs'],
		'camelcase': 'error',
		'capitalized-comments': 'error',
		'comma-dangle': 'error',
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		'consistent-this': 'error',
		'eol-last': 'warn',
		'func-call-spacing': 'error',
		'func-name-matching': 'off',
		'func-names': 'off',
		'func-style': 'off',
		'id-blacklist': 'off',
		'id-length': 'off',
		'id-match': 'off',
		'indent': ['error', 'tab'],
		'jsx-quotes': 'off',
		'key-spacing': 'error',
		'keyword-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'line-comment-position': 'error',
		'linebreak-style': 'off',
		'lines-around-comment': 'error',
		'lines-around-directive': 'off',
		'max-depth': 'off',
		'max-len': ['error', {
			'tabWidth': 1,
			'code': 120
		}],
		'max-lines': 'off',
		'max-nested-callbacks': 'off',
		'max-params': ['error', {
			'max': 3
		}],
		'max-statements-per-line': 'off',
		'max-statements': 'off',
		'multiline-ternary': 'off',
		'new-cap': 'error',
		'new-parens': 'error',
		'newline-after-var': 'error',
		'newline-before-return': 'error',
		'newline-per-chained-call': 'off',
		'no-array-constructor': 'error',
		'no-bitwise': 'error',
		'no-continue': 'off',
		'no-inline-comments': 'error',
		'no-lonely-if': 'error',
		'no-mixed-operators': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-assign': 'error',
		'no-multiple-empty-lines': 'error',
		'no-negated-condition': 'off',
		'no-nested-ternary': 'error',
		'no-new-object': 'error',
		'no-plusplus': 'off',
		'no-restricted-syntax': 'error',
		'no-tabs': 'off',
		'no-ternary': 'off',
		'no-trailing-spaces': 'warn',
		'no-underscore-dangle': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-newline': 'off',
		'object-curly-spacing': 'off',
		'object-property-newline': 'error',
		'one-var-declaration-per-line': 'error',
		'one-var': 'off',
		'operator-assignment': 'off',
		'operator-linebreak': 'off',
		'padded-blocks': 'off',
		'quote-props': ['error', 'consistent'],
		'quotes': ['error', 'single', {
			'allowTemplateLiterals': true
		}],
		'require-jsdoc': 'off',
		'semi-spacing': 'error',
		'semi': 'error',
		'sort-keys': 'off',
		'sort-vars': 'off',
		'space-before-blocks': 'error',
		'space-before-function-paren': 'off',
		'space-in-parens': 'off',
		'space-infix-ops': 'error',
		'space-unary-ops': 'off',
		'spaced-comment': 'error',
		'unicode-bom': 'off',
		'wrap-regex': 'error',
		// ECMAScript 6
		'arrow-body-style': 'off',
		'arrow-parens': 'off',
		'arrow-spacing': 'error',
		'constructor-super': 'off',
		'generator-star-spacing': 'off',
		'no-class-assign': 'error',
		'no-confusing-arrow': 'error',
		'no-const-assign': 'error',
		'no-dupe-class-members': 'error',
		'no-duplicate-imports': 'error',
		'no-new-symbol': 'error',
		'no-restricted-imports': 'off',
		'no-this-before-super': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'no-var': 'error',
		'object-shorthand': 'off',
		'prefer-arrow-callback': 'off',
		'prefer-const': 'off',
		'prefer-destructuring': 'off',
		'prefer-numeric-literals': 'off',
		'prefer-rest-params': 'off',
		'prefer-spread': 'off',
		'prefer-template': 'warn',
		'require-yield': 'off',
		'rest-spread-spacing': 'off',
		'sort-imports': 'off',
		'symbol-description': 'error',
		'template-curly-spacing': 'off',
		'yield-star-spacing': 'off'
	}
};
