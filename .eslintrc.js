const INLINE_ELEMENTS = require('./node_modules/eslint-plugin-vue/lib/utils/inline-non-void-elements.json')
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended", "eslint:recommended"],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "dot-notation": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always"
        }
      }
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignores: ["div", "pre", "textarea","v-spacer","v-divider","v-text-field", ...INLINE_ELEMENTS],
      }
    ]
  }
}
