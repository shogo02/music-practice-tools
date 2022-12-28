module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    "plugin:valtio/recommended",
    'airbnb',
    'airbnb-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
