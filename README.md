# baseproject-auat

Base project for automated user acceptance tests

### Description

Simulate user actions in the browser using selenium, write tests using cucumber-js and gherkin, use chai expects

### Requirements:

* [node.js](https://nodejs.org/en/) v7.4 and above
* [selenium-webdriver](http://www.seleniumhq.org/projects/webdriver/)
* Up to date version of your desired browser, such as firefox
* Respective [driver](http://www.seleniumhq.org/download/) for that browser, such as [geckodriver](https://github.com/mozilla/geckodriver) for firefox. This will need to be placed in the root folder of the project
* run `npm-install` from the root folder of the project

NOTE: In order to run it on a server (like jenkins) phantomjs bin needs to be installed on the system. This can be done by downloading phantomjs and copying it to the repo root folder.

## Setting user login information

If the application you are testing requires you to log in then you need to setup the user login information. To set this up we need to create a file '/test/login_config.js' which contains somthing like the following information:

```script
module.exports = {
    'username': 'yourusername',
    'password': 'yourpassword'
};
```

Replace yourusername and yourpassword with the desired user login, as well as adding further information if your application requires it.

## To run the tests created under the folder test

Run from the root folder the following command:

```script
npm run test
```
or

```script
./node_modules/.bin/cucumber.js test/
```

It should open a new browser window and start to perform the tests

## Writing Gherkin tests

For general instructions on how to write Gherkin tests see the Gherkin [wiki](https://github.com/cucumber/cucumber/wiki/Gherkin)

So generic step definitions we have created can be used, these are:

| Gherkin Step | Description | Variable |
|-------------|:-------------:|:-------------:|
| Given the user is logged in using github| Will log the user in using login_config.js | variables defined in login_config.js|
| Then the text '<variable>' will be displayed | searches for the text on the page | text you want to search for |
| Given the user navigates to the '<variable>' page | navigate to a given page | page to navigate to e.g. '/groups' |
| When the user inputs '<variable>' into the '<variable>' field | fill an input field with text | first variable is the text to input, second variable is the id of the input field |
