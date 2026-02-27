@login
Feature: Login - Book Store Application

  Background:
    Given user navigates to Login page

  # ========================
  # CRITICAL
  # ========================

  @critical
  Scenario: Login with valid credentials
    When user submits valid login
    Then user should be logged in successfully

  @critical
  Scenario: Login with invalid password
    When user submits invalid password
    Then user should see invalid credential alert

  @critical
  Scenario: Login with unregistered username
    When user submits unregistered username
    Then user should see invalid credential alert

  # ========================
  # HIGH
  # ========================

  @high
  Scenario: Login with empty username
    When user submits empty username
    Then user should see login required field validation

  @high
  Scenario: Login with empty password
    When user submits empty password
    Then user should see login required field validation

  @high
  Scenario: Login with both fields empty
    When user submits empty login form
    Then user should see login required field validation

  # ========================
  # MEDIUM
  # ========================

  @medium
  Scenario: Password field should be masked
    Then password field should be masked

  @medium
  Scenario: Press Enter should submit login
    When user submits valid login using Enter key
    Then user should be logged in successfully

  # ========================
  # LOW
  # ========================

  @low
  Scenario: New User button should navigate to Register
    When user clicks New User
    Then user should navigate to Register page

  @low
  Scenario: Logout should return to login page
    Given user is logged in
    When user clicks Logout
    Then user should navigate to Login page