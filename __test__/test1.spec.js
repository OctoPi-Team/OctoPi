// Generated by Selenium IDE
const { assert } = require('console');
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const server_url = "http://localhost:5173/";

// TODO, implement different browsers are used based on this value
const browser = process.env.BROWSER || "chrome";
const browser_path = process.env.BROWSER_PATH || "/usr/bin/brave-browser";

describe('Test1', function () {
  let driver;
  beforeEach(async function () {
    switch (browser) {
      case "firefox":
        let firefox_options = new firefox.Options().headless();
        if (browser_path != null) {
          firefox_options = firefox_options.setBinary(browser_path);
        }
        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(firefox_options).build();
        break;
      case "chrome":
        let chrome_options = new chrome.Options().headless();
        if (browser_path != null) {
          chrome_options.setBinaryPath(browser_path);
        }
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chrome_options).build();
        break;
    }
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Test1', async function () {
    await driver.get(server_url);
    await driver.manage().window().setRect({ width: 1226, height: 771 });
    await driver.findElement(By.css('.video')).click();
    await driver.findElement(By.css('canvas')).click();
    let sgVal = await driver.executeScript('return 45;');
    expect(sgVal).toBe(45);
  });
});
