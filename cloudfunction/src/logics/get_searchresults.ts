import {HttpFunction} from '@google-cloud/functions-framework';

export const getSearchResults: HttpFunction = (req, res) => {
  res.send('search results');
};
