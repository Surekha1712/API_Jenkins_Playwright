Feature: Users Management

  Scenario: Get specific user by ID
    When I send a GET request to retrieve user with id 1
    Then the response status should be 200
    And I print the user details
