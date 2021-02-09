const path = require("path");
module.exports = {
  entry: [
    "./js/util.js",
    "./js/main.js",
    "./js/commentsSlider.js",
    "./js/upload.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
