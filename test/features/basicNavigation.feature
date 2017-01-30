Feature: Navigate to findings for a subscription
    As a user
    I want to be able to click into the findings for an active subscription
    So that I can see the findings for a subscription

    Scenario:
        Given the user navigates to the homepage
        And the user has clicked the 'Continue' button
        When the user clicks the 'About' link
        Then the text 'If you rely on the web' will be displayed
