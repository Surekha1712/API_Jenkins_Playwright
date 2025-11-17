Feature: Products Management

  # Scenario 1: Get all products (prints only first 2)
  Scenario: Retrieve all products
    When I send a GET request to retrieve all products
    Then the response status should be 200
    And I print only first 2 products

  # Scenario 2: Get one product by ID
  Scenario: Retrieve a product by ID
    When I send a GET request to retrieve product with id 1
    Then the response status should be 200
    And I print only first 1 products
