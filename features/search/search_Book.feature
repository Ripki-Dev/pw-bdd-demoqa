Feature: Search Book - Book Store Application

  Background:
    Given user is on Book Store page

  @smoke @search
  Scenario: Search book by full title
    When user searches book with keyword "Git Pocket Guide"
    Then user should see book titled "Git Pocket Guide"

  @search
  Scenario: Search book by partial title
    When user searches book with keyword "Git"
    Then user should see related books containing "Git"

  @search
  Scenario: Search book by author name
    When user searches book with keyword "Richard E. Silverman"
    Then user should see books written by "Richard E. Silverman"

  @search
  Scenario: Search book using lowercase keyword
    When user searches book with keyword "learning javascript design patterns"
    Then user should see book titled "Learning JavaScript Design Patterns"

  @search
  Scenario: Search book using uppercase keyword
    When user searches book with keyword "GIT POCKET GUIDE"
    Then user should see book titled "Git Pocket Guide"

  @negative @search
  Scenario: Search book with non-existing keyword
    When user searches book with keyword "UnknownBook123"
    Then user should see no search results

  @negative @search
  Scenario: Search book with special characters
    When user searches book with keyword "@@@###"
    Then user should see no search results

  @edge @search
  Scenario: Search book with empty keyword
    When user searches book with keyword ""
    Then user should see all available books

  @edge @search
  Scenario: Search book with leading and trailing spaces
    When user searches book with keyword "   Git Pocket Guide   "
    Then user should see book titled "Git Pocket Guide"

  @edge @search
  Scenario: Clear search input
    When user searches book with keyword "Git"
    And user clears search input
    Then user should see all available books