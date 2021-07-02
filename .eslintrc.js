module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/recommended'
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['prettier', '@typescript-eslint/eslint-plugin', 'rxjs', '@angular-eslint/template'],
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
        'prettier/prettier': ['warn'],
        'max-len': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@angular-eslint/no-output-on-prefix': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false
            }
        ],
        '@typescript-eslint/semi': ['error'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as'
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'rxjs/no-compat': 'error',
        'rxjs/no-create': 'error',
        'rxjs/no-internal': 'error',
        'rxjs/no-subject-unsubscribe': 'error',
        'rxjs/no-async-subscribe': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-unbound-methods': 'error',
        'rxjs/no-ignored-subscription': 'error',
        '@angular-eslint/no-output-native': 'off'
    }
};
