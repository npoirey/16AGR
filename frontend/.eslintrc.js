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
  "plugins": [
    "react",
    "jest"
  ],
  "env": {
    "jest": true
  },
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
    "linebreak-style": ["error", "windows"]
  },
  "globals": {
    "document": true,
    "window": true
  }
}
