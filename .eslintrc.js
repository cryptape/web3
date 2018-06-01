module.exports = {
    'extends': 'airbnb-base',
    'parser': 'typescript-eslint-parser',
    'extends': [
        'plugin:prettier/recommended'
    ],
    'plugins': [
        'eslint-plugin-typescript',
    ],
    'rules': {
        "prettier/prettier": ["error", {
            "singleQuote": true
        }],
        'quotes': ['error', 'single']
    },
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
    }
};
