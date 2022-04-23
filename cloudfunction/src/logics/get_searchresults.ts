import { google } from "googleapis"
import { HttpFunction } from '@google-cloud/functions-framework';

const customSearch = google.customsearch('v1');
const options = {
  cx: "9bc5302f216ada935",
  q: "",
  auth: "AIzaSyDW9ZLZazQikKD1MuIaJaX1cdzq77pOYD0"
}

export const getSearchResults: HttpFunction = (req, res) => {
  console.log("query:", req.query);
  const keyword = req.query.keyword?.toString();
  if (keyword) {
    options.q = keyword;
    console.log("keyword:", keyword);
  }
  // TODO 検索キーワードが指定されていない場合は401エラーとすべき？

  // TODO catch()の対応が必要
  customSearch.cse.list(options)
    .then(value => {
      console.log("result:", value.data);
      res.send(JSON.stringify(value.data.items));
    });
};
