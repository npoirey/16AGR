module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "node"
  ],
  "env": {
    "mocha": true
  },
  "rules": {
    "arrow-parens": ["error", "always"],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "consistent-return": 0,
    "linebreak-style": ["error", "unix"],
    "max-len": [
      "error",
      160
    ],
    "semi": [
      "error",
      "never"
    ]
  }
}
