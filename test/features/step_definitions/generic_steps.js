let {defineSupportCode} = require('cucumber'),
    webdriver = require('selenium-webdriver'),
    expect = require('chai').expect,
    config = require('../../config');


const wait = (browser, time) => {
    // Basic way to wait
    let counter = 0;
    browser.wait(function(){
        counter++;
        return counter > (time * 1000)
    });
}

defineSupportCode(function({Given, When, Then, After, Before}) {

    Before(function (){
        browser = new webdriver.Builder()
          .forBrowser(config.webdriverBrowser)
          .build();
          browser.manage().timeouts().implicitlyWait(config.elementLoadTimeOut);
    });

    //Uses the login_config file to fill in the github login information
    Given(/^the user is logged in using github$/, {timeout: config.testTimeOut}, () => {
        let loginConfig = require('../../login_config');
        browser.get(config.baseurl);
        browser.findElement(webdriver.By.className('btn')).then(function(element) {
            element.click();
            browser.findElement(webdriver.By.id('login_field')).then(function(element) {
                return element.sendKeys(loginConfig.username);
            });
            browser.findElement(webdriver.By.id('password')).then(function(element) {
                return element.sendKeys(loginConfig.password);
            });
            browser.findElement(webdriver.By.xpath("//input[@value='Sign in']")).then(function(element) {
                element.click();
                //May require an if statement to click the authorize application github button
                // browser.findElement(webdriver.By.xpath("//input[contains(text(),'Authorize application')]")).then(function(element) {
                //     return element.click();
                // });
                return;
            });
        });
        //wait because if the next step executes before we have been redirected then the login will not have worked
        wait(browser, 2);
    });

    Given(/^the user navigates to the homepage$/, {timeout: config.testTimeOut}, () => {
        return browser.get(config.baseurl);
    });

    Given(/^the user has clicked the '(.*)' button$/, {timeout: config.testTimeOut}, (textValue) => {
        return browser.findElement(webdriver.By.xpath("//button[contains(text(),'" + textValue + "')]")).then(function(element) {
            return element.click();
        });
    });

    Given(/^the user navigates to the '(.*)' page$/, {timeout: config.testTimeOut}, (url) => {
        return browser.get(config.baseurl + url);
    });

    When(/^the user inputs '(.*)' into the '(.*)' field$/, {timeout: config.testTimeOut}, (input, fieldId) => {
        return browser.findElement(webdriver.By.id(fieldId)).then(function(element) {
            return element.sendKeys(input);
        });
    });

    When(/^the user clicks the '(.*)' button$/, {timeout: config.testTimeOut}, (buttonValue) => {
        return browser.findElement(webdriver.By.xpath("//input[@value='" + buttonValue + "']")).click();
    });

    When(/^the user clicks the '(.*)' text$/, {timeout: config.testTimeOut}, (textValue) => {
        browser.findElement(webdriver.By.xpath("//*[contains(text(),'" + textValue + "')]")).then(function(element) {
            return element.click();
        });
    });

    When(/^the user clicks the '(.*)' link$/, {timeout: config.testTimeOut}, (text) => {
        return browser.findElement(webdriver.By.linkText(text)).sendKeys(webdriver.Key.ENTER);
    });

    Then(/^the text '(.*)' will be displayed$/, {timeout: config.testTimeOut}, (text) => {
        return browser.findElement(webdriver.By.xpath("//*[contains(text(),'" + text + "')]"));
    });

    When(/^the user clicks the item with class name '(.*)'$/, {timeout: config.testTimeOut}, (cssClassName) => {
        browser.findElements(webdriver.By.xpath("//*[contains(@class,'" + cssClassName + "')]")).then(function(elements) {
            return elements[0].click();
        });
    });

    Then(/^the page title will be '(.*)'$/, {timeout: config.testTimeOut}, (pageTitle) => {
        wait(browser, 5);
        return browser.getTitle().then(function(title) {
            return expect(title).to.equal(pageTitle);
        });
    });

    Then(/^the page title will not be '(.*)'$/, {timeout: config.testTimeOut}, (pageTitle) => {
        wait(browser, 5);
        return browser.getTitle().then(function(title) {
            return expect(title).to.not.equal(pageTitle);
        });
    });

    After(function (){
        wait(browser, 2);
        return browser.quit();
    });

});
