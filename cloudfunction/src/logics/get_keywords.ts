import {HttpFunction} from '@google-cloud/functions-framework';

export const getKeywords: HttpFunction = async (req, res) => {
  setTimeout(() => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', '*');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }
    res.send('keywords');
  }, 3000);
};
