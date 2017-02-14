module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "mocha": true
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "arrow-parens": ["error", "always"],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "linebreak-style": ["error", "unix"],
    "max-len": [
      "error",
      160
    ],
    "semi": [
      "error",
      "never"
    ],
  },
  "globals": {
    "document": true,
    "window": true
  }
}
