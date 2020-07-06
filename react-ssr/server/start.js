require("ignore-styles");
const fetch = require("node-fetch");


require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-runtime"
  ]
});

console.error = () => {};

require("./index");
global.fetch = fetch;
