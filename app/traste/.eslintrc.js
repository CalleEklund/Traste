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
  "extends": [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:testing-library/react",
    "plugin:jest/all",
  ],
  "parserOptions": {
    "sourceType": "module",
  },
  "rules": {
    "quotes": ["error", "double"],
    "linebreak-style":
    ["error", (process.platform === "win32" ? "windows" : "unix")],
  },
};
