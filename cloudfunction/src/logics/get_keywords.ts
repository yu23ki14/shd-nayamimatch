import {HttpFunction} from '@google-cloud/functions-framework';

export const getKeywords: HttpFunction = async (req, res) => {
  res.send('keywords');
};
