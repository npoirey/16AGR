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
    "semi": [
      "error",
      "never"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "max-len": [
      "error",
      160
    ],
    "linebreak-style": ["error", "unix"]
  },
  "globals": {
    "document": true,
    "window": true
  }
}
