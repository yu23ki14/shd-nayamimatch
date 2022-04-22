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

export const helloWorld: HttpFunction = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello, World a');
};
