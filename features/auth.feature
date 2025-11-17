Feature: Authentication API

  # This feature tests the login functionality using credentials
  # from the .env file. If login fails with those, it automatically
  # retries using default FakeStore credentials.

  Background:
    Given the API base URL is configured

  Scenario: Login with valid credentials
    When I send a POST request to login endpoint
    Then the response status should be 201
    And the response should contain a valid token

  Scenario: Login with invalid credentials
    When I send a POST request to login endpoint with invalid data
    Then the response status should be 401
    And the response should not contain a token
