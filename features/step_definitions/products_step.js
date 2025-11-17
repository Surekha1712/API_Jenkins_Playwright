// features/step_definitions/products_step.js
const { When, Then } = require('@cucumber/cucumber');

When('I send a GET request to retrieve all products', async function () {
  console.log('Getting all products...');
  this.response = await global.apiContext.get('/products');
});

When('I send a GET request to retrieve product with id {int}', async function (id) {
  console.log(` Getting product details for ID: ${id}`);
  this.response = await global.apiContext.get(`/products/${id}`);
});

Then('I print only first {int} products', async function (count) {
  const body = await this.response.json();

  if (Array.isArray(body)) {
    const shortList = body.slice(0, count);
    console.log(`Showing ${shortList.length} of ${body.length} total products:`);
    console.log(JSON.stringify(shortList, null, 2));
  } else {
    console.log('Single Product Details:', JSON.stringify(body, null, 2));
  }
});
