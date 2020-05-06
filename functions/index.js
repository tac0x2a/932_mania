const functions = require("firebase-functions");

const BaseURL = "https://ja.wikipedia.org";
const KusatsuListURL =
  BaseURL +
  "/wiki/%E7%89%B9%E5%88%A5:%E5%89%8D%E6%96%B9%E4%B8%80%E8%87%B4%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%80%E8%A6%A7/%E8%8D%89%E6%B4%A5";
const axios = require("axios").default;
const { JSDOM } = require("jsdom");

let parseList = body => {
  let document = new JSDOM(body);
  let query = "#mw-content-text > div.mw-prefixindex-body > ul > li a";
  let elements = document.window.document.querySelectorAll(query);
  let array = [];
  for (let e of elements) {
    array.push({
      title: e.textContent,
      link: e["href"]
    });
  }
  return array;
};

let parseDetail = body => {
  let document = new JSDOM(body).window.document;
  let detail = {
    title: document.querySelector("#firstHeading").textContent,
    head: document.querySelector("#mw-content-text > div > p"),
    img: document.querySelector("#mw-content-text > div > table.infobox * img"),
    sections: document.querySelectorAll("#mw-content-text > div > h2")
  };
  if (detail.img) detail.img = detail.img["src"];
  if (detail.head) detail.head = detail.head.textContent;

  return detail;
};

exports.kusatsuList = functions.https.onRequest((request, response) => {
  let url = encodeURI(KusatsuListURL);
  axios
    .get(KusatsuListURL)
    .then(res => {
      let body = res.data;
      let list = parseList(body);
      response.send(list);

      return;
    })
    .catch(err => {
      response.status(500, err);
    });
});

exports.kusatsuDetail = functions.https.onRequest((request, response) => {
  let url = BaseURL + request.query.url;

  axios
    .get(url)
    .then(res => {
      let body = res.data;
      let detail = parseDetail(body);
      response.send(detail);

      return;
    })
    .catch(err => {
      response.status(500, err);

      return;
    });
});
