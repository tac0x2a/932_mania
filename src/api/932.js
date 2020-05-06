const axios = require('axios').default;

export default {
  listKusatsu(callback) {
    axios.get('/kusatsuList').then((res) => {
      callback(res.data);
    });
  },
  detailKusatsu(url, callback) {
    console.log("url: " + url)
    axios.get('/kusatsuDetail', { params: { url } }).then((res) => {
      callback(res.data);
    });
  },
};
