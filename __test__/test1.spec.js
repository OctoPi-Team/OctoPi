// Generated by Selenium IDE
const { assert } = require('console');
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const server_url = "http://localhost:5173/";


describe('Test1', function () {
  let driver;
  beforeEach(async function () {
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
  }, 15000);

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
