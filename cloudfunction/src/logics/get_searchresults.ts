import {google} from 'googleapis';
import {HttpFunction} from '@google-cloud/functions-framework';
import * as dotenv from 'dotenv';
dotenv.config();

const OFFSET_MAXLIMIT = 10;
const customSearch = google.customsearch('v1');
const {API_KEY, SEARCH_ENGINE_ID, EXCLUDE_TERMS} = process.env;
const options = {
  cx: SEARCH_ENGINE_ID,
  q: '',
  num: OFFSET_MAXLIMIT,
  // excludeTerms: '',
  auth: API_KEY,
};
interface SearchResult {
  title: string;
  url: string;
  thumbnail: string;
}

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
    res.status(400).json({message: 'keywords is empty'});
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

  // await getSearchIgnoreWords().then(value => {
  //   // console.log("value:", value);
  //   options.excludeTerms = value;
  // });

  console.log('condition', {keywords: options.q, offset: options.num});
  customSearch.cse
    .list(options)
    .then(value => {
      let customSearchResults: SearchResult[] = [];
      if (value.data.items) {
        value.data.items.forEach((item: any, index: number): void => {
          const result: SearchResult = {
            title: item.title,
            url: item.link,
            thumbnail: '',
          };
          if (item.pagemap.cse_thumbnail) {
            result.thumbnail = item.pagemap.cse_thumbnail[0].src;
          } else if (item.pagemap.metatags) {
            for (const [key, value] of Object.entries(item.pagemap.metatags)) {
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
        res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
          // Send response to OPTIONS requests
          res.set('Access-Control-Allow-Methods', '*');
          res.set('Access-Control-Allow-Headers', 'Content-Type');
          res.set('Access-Control-Max-Age', '3600');
        }
        res.send(JSON.stringify({results: customSearchResults}));
      } else {
        res.status(404).json({message: 'not found'});
      }
      return customSearchResults;
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({message: `<Internal Server Error.> ${error}`});
    });
};

async function getSearchIgnoreWords(): Promise<string> {
  let ignoreWord: string = '';
  if (!EXCLUDE_TERMS) {
    return ignoreWord;
  }

  if (EXCLUDE_TERMS.indexOf(',') !== -1) {
    ignoreWord = EXCLUDE_TERMS.replace(/,/g, ' ');
  } else {
    ignoreWord = EXCLUDE_TERMS;
  }
  return encodeURI(ignoreWord);
}
