import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import processMessage from './process-message';

const app: any = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For chating between client and client
app.post('/chat', async (req: any, res: any) => {
  const { message } = req.body;
  const result = await processMessage(message);
  res.end(JSON.stringify({ result }, null, 2));
});

exports.api = functions.https.onRequest(app);
