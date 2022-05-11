import { google } from 'googleapis';
import { HttpFunction } from '@google-cloud/functions-framework';
import * as dotenv from 'dotenv';
// import axios from "axios";
// import { JSDOM } from 'jsdom'
dotenv.config();

const OFFSET_MAXLIMIT = 10;
const customSearch = google.customsearch('v1');
const { API_KEY, SEARCH_ENGINE_ID, EXCLUDE_TERMS } = process.env;
const options = {
  cx: SEARCH_ENGINE_ID,
  q: '',
  num: OFFSET_MAXLIMIT,
  excludeTerms: '',
  auth: API_KEY,
};
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
  thumbnail: string;
}

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

export const getSearchResults: HttpFunction = async (req, res) => {

  let query: string = '';
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
  options.q = query;

  const queryoffset = req.query.offset?.toString();
  if (queryoffset) {
    const offset = Number(queryoffset);
    if (offset && 0 < offset && offset < OFFSET_MAXLIMIT) {
      options.num = Number(offset);
    }
  }

  await getSearchIgnoreWords().then(value => {
    // console.log("value:", value);
    options.excludeTerms = value;
  });

  console.log('option:', options);
  customSearch.cse
    .list(options)
    .then(value => {
      let customSearchResults: SearchResult[] = [];
      if (value.data.items) {
        value.data.items.forEach((item: any, index: number): void => {
          // console.log(`index:${index}, item:`, item);
          const result: SearchResult = {
            title: item.title,
            url: item.link,
            thumbnail: '',
          };
          if (item.pagemap.cse_thumbnail) {
            result.thumbnail = item.pagemap.cse_thumbnail[0].src;
          } else if (item.pagemap.metatags) {
            for (const [key, value] of Object.entries(item.pagemap.metatags)) {
              // console.log(`${key}: ${value}`);
              if (key === 'og:image') {
                const ogimage = value as string;
                if (ogimage) {
                  result.thumbnail = ogimage;
                }
                break;
              }
            }
          }
          customSearchResults.push(result);
        });
        res.send(JSON.stringify({ results: customSearchResults }));
      }
      return customSearchResults;
    })
    // .then(customSearchResults => {
    //   console.log("customSearchResults:", customSearchResults);
    //   if (!customSearchResults || customSearchResults.length === 0) {
    //     return customSearchResults;
    //   }
    //   const thumbnailResults = customSearchResults.map(async result => {
    //     await getThumbnailURL(result.url).then(url => {
    //       console.log("url:", url);
    //       if (url) {
    //         result.thumbnail = url;
    //       }
    //     });
    //   });
    //   return thumbnailResults;
    // })
    // .then(thumbnailResults => {
    //   console.log("thumbnailResults:", thumbnailResults);
    //   res.send(JSON.stringify(thumbnailResults));
    // })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: `<Internal Server Error.> ${error}` });
    });
};

async function getSearchIgnoreWords(): Promise<string> {
  // console.log("EXCLUDE_TERMS:", EXCLUDE_TERMS);
  let ignoreWord: string = '';
  if (!EXCLUDE_TERMS) {
    return ignoreWord;
  }

  if (EXCLUDE_TERMS.indexOf(',') !== -1) {
    ignoreWord = EXCLUDE_TERMS.replace(/,/g, ' ');
  } else {
    ignoreWord = EXCLUDE_TERMS;
  }
  // console.log("ignoreWord:", ignoreWord);
  return encodeURI(ignoreWord);
}

// async function getThumbnailURL(targetUrl: string): Promise<string | undefined> {
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
//     // console.log("getThumbnailImage ogp:", ogp);
//     return ogp;
//   }

//   let imagesrc: string | undefined;
//   // リクエストで渡されたURLごとにOGPを取得
//   const targetUrls: string[] = [targetUrl];
//   await Promise.all(
//     targetUrls.map(async (targetUrl: string) => {
//       const encodedUri = encodeURI(targetUrl);
//       const headers = { 'User-Agent': 'bot' };

//       console.log(`targetUrl:${targetUrl}`);

//       try {
//         const res = await axios.get(encodedUri, { headers: headers });
//         const html = res.data;
//         const dom = new JSDOM(html);
//         const meta = dom.window.document.head.querySelectorAll("meta");
//         const ogp = extractOgp(Array.from(meta));

//         for (const [key, value] of Object.entries(ogp)) {
//           // console.log(`${key}: ${value}`);
//           if (key === 'og:image') {
//             imagesrc = value as string;
//             break;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }));
//   return imagesrc;
// }
