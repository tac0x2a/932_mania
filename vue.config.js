module.exports = {
  devServer: {
    proxy: {
      "/wiki": {
        target: "https://ja.wikipedia.org",
      }
    }
  }
}