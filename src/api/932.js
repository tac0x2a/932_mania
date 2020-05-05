const KusatsuListURL =
  '/wiki/%E7%89%B9%E5%88%A5:%E5%89%8D%E6%96%B9%E4%B8%80%E8%87%B4%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%80%E8%A6%A7/%E8%8D%89%E6%B4%A5'

const axios = require('axios').default;

const { JSDOM } = require('jsdom');

let parseList = (body) => {
  let document = new JSDOM(body);
  let query = "#mw-content-text > div.mw-prefixindex-body > ul > li a";
  let elements = document.window.document.querySelectorAll(query);
  let array = [];
  for (let e of elements) {
    array.push({
      title: e.textContent,
      link: e['href'],
    });
  }
  return array;
};

let parseDetail = (body) => {
  let document = new JSDOM(body).window.document;
  let detail = {
    title: document.querySelector("#firstHeading").textContent,
    head: document.querySelector("#mw-content-text > div > p"),
    img: document.querySelector("#mw-content-text > div > table.infobox * img"),
    sections: document.querySelectorAll("#mw-content-text > div > h2")
  }
  if(detail.img)  detail.img = detail.img["src"]
  if(detail.head) detail.head = detail.head.textContent

  return detail
}


export default {
  listKusatsu(callback) {
    console.log('listKusatsu');
    axios.get(KusatsuListURL).then((response) => {
      let list = parseList(response.data);
      callback(list);
    });
  },
  detailKusatsu(url, callback) {
    axios.get(url).then((response) => {
      let detail = parseDetail(response.data);
      callback(detail);
    });
  },
};
