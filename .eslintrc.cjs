module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs,jsx,svg}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope ": 0,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "no-use-before-define": 0,
    "react/style-prop-object": 0,
    "global-require": 0,
    "import/no-extraneous-dependencies": 0,
    "no-unused-vars": 0,
    "import/prefer-default-export": 0,
    "react-hooks/rules-of-hooks": 0,
  },
};
