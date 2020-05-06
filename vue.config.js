module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "932mania"
    }
  },
  devServer: {
    proxy: {
      "/kusatsuList": {
        target: "http://localhost:5000" // local firebase function
      },
      "/kusatsuDetail": {
        target: "http://localhost:5000" // local firebase function
      }
    }
  }
}