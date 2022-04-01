/* eslint linebreak-style: ["error", "windows"]*/
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 8,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "linebreak-style": ["error",
      (process.platform === "win32" ? "windows" : "unix")],
  },
};
