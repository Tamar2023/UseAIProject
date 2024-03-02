const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const { promisify } = require('util');
const app = express();
const port = 3000;
const OPENAI_API_KEY = '*****';
const OPENAI_ENGINE = 'davinci';
const openai = new OpenAI({ key: OPENAI_API_KEY, engine: OPENAI_ENGINE });
const openaiComplete = promisify(openai.complete.bind(openai));

let openaiResponse;
let index = 0;
let greeting;

app.use(cors());

app.get('/', async (req, res) => {
  const params = req.query;
  const eventType = params.eventType;
  const length = params.length;
  const atmosphere = params.atmosphere;
  const style = params.style;

  if (eventType === 'birthday') {
    const age = params.age;
    greeting = `Write me a ${length} ${eventType} greeting for a ${age}-year-old, in a ${atmosphere} atmosphere and in a ${style} style.`;
  } else if (eventType === 'wedding') {
    const family = params.family;
    greeting = `Write me a ${length} ${eventType} greeting, include the last name ${family} in the greeting, in a ${atmosphere} atmosphere and in a ${style} style.`;
  } else if (eventType === 'goodbye') {
    const person = params.person;
    greeting = `Write me a ${length} ${eventType} greeting from ${person}, in a ${atmosphere} atmosphere and in a ${style} style.`;
  }

  await callOpenapi(greeting, res);
});

app.get('/otherGreeting', async (req, res) => {

  index += 1;
  console.log(index);
  if (index == 3) await callOpenapi(greeting, res);
  else res.send(`otherGreeting: ${openaiResponse[index]}`);
});

async function callOpenapi(greeting, res) {
  index = 0;
  try {
    const response = await openaiComplete({
      prompt: greeting,
      max_tokens: 100,
      n: 3,
    });
    openaiResponse = response.choices;
    res.send(openaiResponse[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

app.listen(port, () => {
  console.log(`Server is listening at http:localhost:${port}`);
});

module.exports = app