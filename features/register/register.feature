@register
Feature: Register - Book Store Application

  Background:
    Given user navigates to Register page

  # ========================
  # CRITICAL
  # ========================

  @critical
  Scenario: Register with valid data
    When user submits valid registration
    Then registration should be successful

  @critical
  Scenario: Register with duplicate username
    When user submits duplicate username
    Then user should see duplicate alert

  @critical
  Scenario: Register without solving captcha
    When user submits valid data without captcha
    Then user should see captcha validation alert

  # ========================
  # HIGH
  # ========================

  @high
  Scenario: Register with weak password
    When user submits weak password
    Then user should see password validation error

  @high
  Scenario: Register with password without number
    When user submits password without number
    Then user should see password validation error

  @high
  Scenario: Register with password without uppercase
    When user submits password without uppercase
    Then user should see password validation error

  # ========================
  # MEDIUM
  # ========================

  @medium
  Scenario: Register with empty first name
    When user submits empty first name
    Then user should see register required field validation

  @medium
  Scenario: Register with empty username
    When user submits empty username
    Then user should see register required field validation

  @medium
  Scenario: Register with password less than 8 characters
    When user submits short password
    Then user should see password validation error

  # ========================
  # LOW
  # ========================

  @low
  Scenario: Back to login button works
    When user clicks back to login
    Then user should navigate to login page

  @low
  Scenario: Refresh page keeps register form
    When user refreshes register page
    Then register page should remain visible