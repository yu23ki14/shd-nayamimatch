import {HttpFunction} from '@google-cloud/functions-framework';
import language from '@google-cloud/language';

export const getKeywords: HttpFunction = async (req, res) => {
  const lc = new language.LanguageServiceClient();
  const document: {content: string; type: 'PLAIN_TEXT'} = {
    content: String(req.body.text),
    type: 'PLAIN_TEXT',
  };

  const [result] = await lc.analyzeEntities({document: document});

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
