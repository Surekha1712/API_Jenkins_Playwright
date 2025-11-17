const { request } = require('@playwright/test');
const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
require('dotenv').config();

BeforeAll(async function () {
  console.log("Setting up API Context...");

  const headers = {
    'Content-Type': 'application/json',
  };

  if (global.AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${global.AUTH_TOKEN}`;
  }

  global.apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: headers,
  });

  console.log(`✅ API Context initialized for ${process.env.ENVIRONMENT}`);
});

AfterAll(async function () {
  await global.apiContext.dispose();
  console.log("API Context closed");
});
