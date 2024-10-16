import { defineConfig } from "eslint-define-config";
import airbnbTypescript from "eslint-config-airbnb-typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      "no-throw-literal": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "react/prop-types": "off",
      "react/no-danger": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["snake_case", "camelCase", "PascalCase", "UPPER_CASE"],
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/no-unused-prop-types": "warn",
      "class-methods-use-this": "off",
      "linebreak-style": ["error", "unix"],
      "no-async-promise-executor": "off",
      "import/imports-first": ["error", "absolute-first"],
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-const-assign": "error",
      "no-dupe-keys": "error",
      "no-constant-condition": "off",
    },
  },
  airbnbTypescript,
  prettier,
]);
