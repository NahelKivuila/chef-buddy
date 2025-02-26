import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: { extends: [] }
});

const eslintConfig = [
    ...compat.config({
        extends: [
            "next/core-web-vitals",
            "next/typescript",
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
            "plugin:jsx-a11y/recommended",
            "plugin:import/recommended",
            "prettier"
        ],
          plugins: ["react", "react-hooks", "jsx-a11y", "import", "prettier"],
          rules: {
            "prettier/prettier": ["error", { "endOfLine": "auto" }],
            "react/react-in-jsx-scope": "off",
            "import/order": [
              "error",
              {
                groups: ["builtin", "external", "internal"],
                pathGroups: [
                  {
                    pattern: "react",
                    group: "external",
                    position: "before"
                  }
                ],
                alphabetize: { "order": "asc", "caseInsensitive": true }
              }
            ],
            "jsx-a11y/anchor-is-valid": [
              "error",
              {
                components: ["Link"],
                specialLink: ["hrefLeft", "hrefRight"],
                aspects: ["invalidHref", "preferButton"]
              }
            ]
          },
          settings: {
            react: {
              version: "detect"
            },
            "import/resolver": {
              node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
              }
            }
          }
    }),
]

export default eslintConfig;
