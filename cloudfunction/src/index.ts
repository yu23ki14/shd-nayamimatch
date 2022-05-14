// console.log('Try npm run lint/fix!');

// const longString =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut aliquet diam.';

// const trailing = 'Semicolon';

// const why = 'am I tabbed?';

// export function doSomeStuff(
//   withThis: string,
//   andThat: string,
//   andThose: string[]
// ) {
//   //function on one line
//   if (!andThose.length) {
//     return false;
//   }
//   console.log(withThis);
//   console.log(andThat);
//   console.dir(andThose);
//   return;
// }
// // TODO: more examples

import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {getKeywords} from './logics/get_keywords';
import {getSearchResults} from './logics/get_searchresults';

export const index: HttpFunction = async (req, res) => {
  const allowedMethods = ['POST', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    res
      .status(405)
      .json({message: `METHOD NOT ALLOWED! method:${req.method}`})
      .end();
    return;
  }
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.send('');
    return;
  }
  switch (req.path) {
    case '/get-keywords':
      await getKeywords(req, res);
      return;
    case '/get-searchresults':
      await getSearchResults(req, res);
      return;
    default:
      res.send('not found');
      return;
  }
};
