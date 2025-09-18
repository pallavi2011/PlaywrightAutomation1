const {test, expect} = require('@playwright/test');



test('Browser context Test', async ({browser}) => {
    const context =  await browser.newContext();
    
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const password = page.locator('[type="password"]');
    const cardTitles = page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
     console.log(await page.title());
     await userName.fill('rahulshetty');
     await password.fill('learning');
     await signInBtn.click();
     console.log(await page.locator('[style*="block"]').textContent());
     await userName.fill('');
     await password.fill('');
     await userName.fill('rahulshettyacademy');
     await password.fill('learning');
     await signInBtn.click();

     console.log(await cardTitles.first().textContent());
     console.log(await cardTitles.nth(2).textContent());
     
     //all card titles
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles); 


})

test('UI Basics Test', async ({page}) => {
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/);

})