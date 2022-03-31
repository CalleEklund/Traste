module.exports = {
  "parser": "@babel/eslint-parser",
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "env": {
    "browser": true,
    "es2021": true,
  },
  "parserOptions": {
    "sourceType": "module",
  },
  "rules": {
    "quotes": ["error", "double"],
    "linebreak-style": ["error", "unix"],
  },
};
