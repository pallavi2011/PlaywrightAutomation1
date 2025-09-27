const {test,expect} = require("@playwright/test");
 
 
test("Hidden inputs validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    expect(page.locator("#displayed-text")).not.toBeVisible();
    await page.locator("#show-textbox").click();
    expect(page.locator("#displayed-text")).toBeVisible();

    
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator('#mousehover').hover();

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    textCheck.split(" ")[1].trim();
    console.log(textCheck);
   

})