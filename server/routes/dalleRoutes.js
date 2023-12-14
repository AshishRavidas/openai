import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);

  router.route('/').get(async (req, res) => {
    res.send('Hello');
  });
  router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.log("abc");
      console.error(error);
      res.status(500).send(error?.response.data.error.message);
    }
  });
  export default router;