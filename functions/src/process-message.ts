import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Dialogflow from 'dialogflow';
import getWeatherInfo from './weather';
admin.initializeApp(functions.config().firebase);

// You can find your project ID in your Dialogflow agent settings
const projectId = 'weather-bot-swcbpp'; // https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const privateKey = functions.config().dialogflow.private_key.replace(new RegExp('\\\\n', '\g'), '\n');
const config = {
  credentials: {
    client_email: functions.config().dialogflow.client_email,
    private_key: privateKey,
  },
};

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

export default async function processMessage(message: string) {
  console.log('privateKey', privateKey);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  try {
    // throw a message to DialogFlow
    const [ { queryResult } ] = await sessionClient.detectIntent(request);

    // If the intent matches 'detect-city'
    if (queryResult.intent.displayName === 'detect-city') {
      const city = queryResult.parameters.fields['geo-city'].stringValue;

      // fetch the temperature from openweather map
      const temperature = await getWeatherInfo(city);

      await admin
        .firestore()
        .collection('messages')
        .add({
          userId: 'WeatherBot',
          isBot: true,
          message: createTextMessage(`The weather is ${city} is ${temperature}°C`),
        });

      return 'OK';
    } else {
      await admin
        .firestore()
        .collection('messages')
        .add({
          userId: 'WeatherBot',
          isBot: true,
          message: createTextMessage(queryResult.fulfillmentText),
        });
    }

  } catch (err) {
    console.error('ERROR:', err);
    return Promise.reject('NG');
  }
}

function createTextMessage(text: string): string {
  return JSON.stringify({
    type: 'TEXT',
    text,
  });
}
