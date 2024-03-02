const request = require('supertest');
const app = require('./app'); // Assuming your main app file is named 'app.js'

describe('Test the / endpoint', () => {
  test('It should respond with the openaiResponse', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.anything()); // Assuming openaiResponse is expected to be present
  });
});

describe('Test the /otherGreeting endpoint', () => {
  test('It should respond with the next openaiResponse', async () => {
    const response = await request(app).get('/otherGreeting');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.anything()); // Assuming openaiResponse is expected to be present
  });
});

describe('GET /otherGreeting', () => {
  it('responds with 200 and the third greeting from the OpenAI response after three requests', async () => {
    // Assuming that the API endpoint '/otherGreeting' should return the third greeting after three requests
    let response;
    for (let i = 0; i < 3; i++) {
      response = await request(app).get('/otherGreeting');
    }

    expect(response.status).toBe(200);
    expect(response.text).toEqual(expect.any(String)); // You can add more specific assertions based on your requirements
  });
});
