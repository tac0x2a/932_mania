module.exports = {
  devServer: {
    proxy: {
      "/kusatsuList": {
        target: "http://localhost:5001/mania-85038/us-central1",
      },
      "/kusatsuDetail": {
        target: "http://localhost:5001/mania-85038/us-central1",
      }
    }
  }
}