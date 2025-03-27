// fetchAlexaActivity.js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');


// Get credentials from environment variables
const AMAZON_EMAIL = process.env.AMAZON_EMAIL;
const AMAZON_PASSWORD = process.env.AMAZON_PASSWORD;

if (!AMAZON_EMAIL || !AMAZON_PASSWORD) {
  console.error('Error: Please set AMAZON_EMAIL and AMAZON_PASSWORD environment variables.');
  process.exit(1);
}

// URLs for Amazon homepage and Alexa activity page
const homeUrl = 'https://www.amazon.in';
const activityUrl = 'https://www.amazon.in/alexa-privacy/apd/rvh';

(async function fetchAlexaActivity() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Go to the Amazon homepage
    await driver.get(homeUrl);
    console.log("Waiting 1.............")
    // 2. Wait for and click the "Hello, Sign in" link in the header
    await driver.wait(until.elementLocated(By.id('nav-link-accountList')), 15000);
    let signInLink = await driver.findElement(By.id('nav-link-accountList'));
    console.log("Waiting 2.................")
    await signInLink.click();

    // 3. Wait for the email input field on the sign-in page
    await driver.wait(until.elementLocated(By.id('ap_email')), 15000);
    let emailField = await driver.findElement(By.id('ap_email'));
    await emailField.clear();
    await emailField.sendKeys(AMAZON_EMAIL);

    // 4. Click the "Continue" button
    let continueButton = await driver.findElement(By.id('continue'));
    await continueButton.click();

    // 5. Wait for the password field to appear
    await driver.wait(until.elementLocated(By.id('ap_password')), 15000);
    let passwordField = await driver.findElement(By.id('ap_password'));
    await passwordField.clear();
    await passwordField.sendKeys(AMAZON_PASSWORD);

    // 6. Click the "Sign-In" button
    let signInSubmit = await driver.findElement(By.id('signInSubmit'));
    await signInSubmit.click();

    // 7. Allow time for any potential 2FA or CAPTCHA resolution
    console.log('If prompted for 2FA or CAPTCHA, please complete it in the browser.');
    await new Promise((resolve) => setTimeout(resolve, 15000));

    // 8. Navigate to the Alexa Activity Page
    await driver.get(activityUrl);
    // await driver.get("https://www.amazon.in/alexa-privacy/apd/activity");

    console.log("Finished Wating for activityURL")
    // await driver.wait(until.urlContains('/alexa-privacy/apd/rvh'), 20000);
    await driver.wait(async () => {
      // Grab the current URL
      const currentUrl = await driver.getCurrentUrl();
      console.log("Current URL:", currentUrl);
    
      // Return true when the substring is found
      return currentUrl.includes("/alexa-privacy/apd/");
    }, 20000, "Timed out waiting for '/alexa-privacy/apd/rvh' in the URL");
    
    console.log('Successfully navigated to the Alexa Activity Page.');
    
    // 9. Wait for the page to fully load (adjust the selector if needed)
    await driver.wait(until.elementLocated(By.css('body')), 20000);

    let cookies = await driver.manage().getCookies();
    const outputCookiesPath = path.join(__dirname, 'cookies.json');
    fs.writeFileSync(outputCookiesPath, JSON.stringify(cookies, null, 2));
    console.log(`Cookies have been written to ${outputCookiesPath}`);

    // 10. Get the live, fully rendered DOM using document.documentElement.outerHTML
    let renderedHTML = await driver.executeScript("return document.documentElement.outerHTML;");

    // 11. Write the live HTML to backend/output.html
    const outputPath = path.join(__dirname, '.', 'output.html');
    fs.writeFileSync(outputPath, renderedHTML, 'utf8');
    console.log(`Rendered HTML has been written to ${outputPath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await driver.quit();
  }
})();
