import { google } from "googleapis"
import { HttpFunction } from '@google-cloud/functions-framework';
import * as dotenv from 'dotenv';
import axios from "axios";
import { JSDOM } from 'jsdom'
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
// interface CustomSearchOptions {
//   cx: string | undefined;
//   q: string;
//   num: number;
//   // ExcludeTerms: string | undefined;
//   auth: string | undefined;
// }
interface SearchResult {
  title: string;
  url: string;
  thumbnail: string | undefined;
}

// async function getSearchIgnoreWords(): Promise<string> {
//   const ignoreWordList = ["おむつプレイ"];
//   return new Promise((resolve) => {
//     const ignoreWord = ignoreWordList.join(',').replace(/,/g, ' ');
//     console.log("ignoreWord:", ignoreWord);
//     return encodeURI(ignoreWord);
//   });
// }

// async function googleCustomSearch(query: string, offset: number = 50): Promise<any> {
//   const options: CustomSearchOptions = {
//     cx: SEARCH_ENGINE_ID,
//     q: query,
//     num: offset,
//     ExcludeTerms: await getSearchIgnoreWords(),
//     auth: API_KEY
//   }
//   // options.q = query;
//   // options.num = offset;
//   // options.ExcludeTerms = getSearchIgnoreWords().then(ignoreWords => { return ignoreWord; });
//   // customSearch.cse.list(options)
//   //   .then(value => {
//   //     console.log("result:", value.data);
//   //     res.send(JSON.stringify(value.data.items));
//   //   });
//   console.log("option:", options);
//   const result = await customSearch.cse.list(options);
//   console.log("result:", result.data);
//   return result.data;
// }

export const getSearchResults: HttpFunction = (req, res) => {
  console.log("body:", req.body);

  let query: string = "";
  const keywords = req.body.keywords;
  if (keywords) {
    if (Array.isArray(keywords)) {
      query = keywords.join(',').replace(/,/g, ' ');
    } else {
      query = keywords;
    }
  } else {
    res.status(400).json({ message: 'keywords is empty' });
    return;
  }
  console.log("query:", query);

  const getSearchIgnoreWords = async () => {
    const ignoreWordList = ["おむつプレイ"];
    const ignoreWord = ignoreWordList.join(',').replace(/,/g, ' ');
    console.log("ignoreWord:", ignoreWord);
    return encodeURI(ignoreWord);
    // return new Promise((resolve) => {
    //     const ignoreWord = ignoreWordList.join(',').replace(/,/g, ' ');
    //     console.log("ignoreWord:", ignoreWord);
    //     return encodeURI(ignoreWord);
    //   });
  };
  options.q = query;
  options.num = 5;
  // options.ExcludeTerms = getSearchIgnoreWords().then();
  // getSearchIgnoreWords().then(ignoreWords => {
  //   console.log("ignoreWords:", ignoreWords);
  //   options.ExcludeTerms = ignoreWords;
  // });
  // console.log('test:', getSearchIgnoreWords().then(() => { console.log('then first'); }));
  // console.log('test:', getSearchIgnoreWords().then());

  // const getThumbnailImage = async (targetUrl: string) => {
  //   const encodedUri = encodeURI(targetUrl);
  //   const headers = { 'User-Agent': 'bot' };
  //   const extractOgp = (metaElements: HTMLMetaElement[]) => {
  //     const ogp = metaElements
  //       .filter((element: Element) => element.hasAttribute("property"))
  //       .reduce((previous: any, current: Element) => {
  //         const property = current.getAttribute("property")?.trim();
  //         if (!property) return;
  //         const content = current.getAttribute("content");
  //         previous[property] = content;
  //         return previous;
  //       }, {});
  //     console.log("getThumbnailImage ogp:", ogp);
  //     return ogp;
  //   }

  //   try {
  //     const res = await axios.get(encodedUri, { headers: headers });
  //     const dom = new JSDOM(res.data);
  //     const meta = dom.window.document.head.querySelectorAll("meta");
  //     const ogp = extractOgp([...meta]);
  //     return ogp;
  //   } catch (error) {
  //     console.error("getThumbnailImage failed!", error);
  //   }
  // }

  console.log("option:", options);
  customSearch.cse.list(options)
    .then(value => {
      if (value.data.items) {
        let results: SearchResult[] = [];
        value.data.items.forEach((item: any, index: number) => {
          // console.log(`index:${index}, item:`, item);
          let thumbnail: string | undefined = '';
          if (item.pagemap.cse_thumbnail) {
            thumbnail = item.pagemap.cse_thumbnail[0].src;
          }
          // let thumbnail: string | undefined = '';
          // getThumbnailImage(item.link).then();
          // if (!thumbnail) {
          //   thumbnail = '';
          // }
          const result: SearchResult = {
            title: item.title,
            url: item.link,
            thumbnail: thumbnail
          }
          results.push(result);
        });
        res.send(JSON.stringify(results));
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: `<Internal Server Error.> ${error}` });
    });
};
