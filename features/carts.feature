Feature: Carts Management

  # Scenario 1: Retrieve all carts (shows only limited data)
  Scenario: Get all carts
    When I send a GET request to retrieve all carts
    Then the response status should be 200
    And I print only first 1 carts

  # Scenario 2: Retrieve a specific cart by ID
  Scenario: Get a specific cart by ID
    When I send a GET request to retrieve cart with id 2
    Then the response status should be 200
    And I print only first 1 carts
