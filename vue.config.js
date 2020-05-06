module.exports = {
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