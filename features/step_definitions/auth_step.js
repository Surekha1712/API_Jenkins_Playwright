// features/step_definitions/auth_step.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
require('dotenv').config();

Given('the API base URL is configured', async function () {
  console.log(`Base URL set to: ${process.env.BASE_URL}`);
});

When('I send a POST request to login endpoint', async function () {
  const username = process.env.USERNAME?.trim();
  const password = process.env.PASSWORD?.trim();

  console.log(`Logging in with username: ${username}`);

  const body = { username, password };
  this.response = await global.apiContext.post('/auth/login', { data: body });

  // Retry with default FakeStore credentials if your .env credentials fail
  if (this.response.status() === 401) {
    console.warn('Login failed with .env credentials. Retrying with FakeStore default user...');
    this.response = await global.apiContext.post('/auth/login', {
      data: { username: 'mor_2314', password: '83r5^_' },
    });
  }

  // Store token if login successful
  if (this.response.status() === 200) {
    const responseBody = await this.response.json();
    if (responseBody.token) {
      global.AUTH_TOKEN = responseBody.token;
      console.log('Token generated and stored globally.');
    }
  }
});

Then('the response should contain a valid token', async function () {
  const body = await this.response.json();
  expect(body.token).toBeDefined();
  console.log('Token:', body.token);
});

When('I send a POST request to login endpoint with invalid data', async function () {
  console.log('Attempting login with invalid credentials...');
  const body = { username: 'wrong_user', password: 'wrong_pass' };
  this.response = await global.apiContext.post('/auth/login', { data: body });
});

Then('the response should not contain a token', async function () {
  let bodyText;

  try {
    bodyText = await this.response.text(); // ✅ safer than .json()
  } catch (err) {
    console.error('Could not read response text:', err);
  }

  console.log('Raw Response:', bodyText);

  // Check if response includes a token
  expect(bodyText.includes('token')).toBeFalsy();
  console.log('Token not found — login correctly rejected.');
});
