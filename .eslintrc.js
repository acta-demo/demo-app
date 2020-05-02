
module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
	"plugin:prettier/recommended",
    	"prettier/@typescript-eslint"
    ],
    "globals": {},
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "project": "tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "settings": {},
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": true
                }
            }
        ]
    }
};
