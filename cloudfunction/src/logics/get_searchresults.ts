import { google } from "googleapis"
import { HttpFunction } from '@google-cloud/functions-framework';
import * as dotenv from 'dotenv';
dotenv.config();

const customSearch = google.customsearch('v1');
const { API_KEY, SEARCH_ENGINE_ID } = process.env;
const options = {
  cx: SEARCH_ENGINE_ID,
  q: "",
  num: 0,
  ExcludeTerms: "",
  auth: API_KEY
}

export const getSearchResults: HttpFunction = (req, res) => {
  console.log("query:", req.query);

  const keyword = req.query.keyword?.toString();
  if (keyword) {
    options.q = keyword;
    console.log("keyword:", keyword);
  }
  // TODO 検索キーワードが指定されていない場合は401エラーとすべき？
  const offset = req.query.offset?.toString();
  if (offset) {
    options.num = Number(offset);
    console.log("offset:", offset);
  }
  // TODO
  //options.ExcludeTerms = encodeURI("神奈川");

  // TODO catch()の対応が必要
  customSearch.cse.list(options)
    .then(value => {
      console.log("result:", value.data);
      res.send(JSON.stringify(value.data.items));
    });
};
