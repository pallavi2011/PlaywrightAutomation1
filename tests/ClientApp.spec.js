const {test, expect} = require('@playwright/test');



test('App registration Test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
     await page.locator('#userEmail').fill('pallavi.kuligod@gmail.com');
        await page.locator('#userPassword').fill('Pass1234');
     await page.locator("[value='Login']").click();
    //  await page.waitForLoadState('networkidle');
     await page.locator('.card-body b').first().waitFor();
     const titles = await page.locator('.card-body b').allTextContents();
     console.log(titles);

   
     

})


test('UI controls Test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const userName = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const password = page.locator('[type="password"]');
    const documentLink = page.locator('a[href*="documents-request"]');
     await userName.fill('rahulshetty');
     await password.fill('learning');
    
     const dropdown = page.locator('select.form-control');
     await dropdown.selectOption('consult');

    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
await page.locator('#terms').click();
await expect(page.locator('#terms')).toBeChecked();
await page.locator('#terms').uncheck();
expect(page.locator('#terms')).not.toBeChecked();

await expect(documentLink).toHaveAttribute('class','blinkingText');
    // await page.pause();

})

test.only('Child window Test', async ({browser}) => {
    const context =  await browser.newContext();
    
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
     const documentLink = page.locator('a[href*="documents-request"]');
     const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(), // Opens a new tab
     ]);
    
     const text = await newPage.locator('.red').textContent();
        console.log(text);
        const arrayText = text.split('@');
        const domain = arrayText[1].split(' ')[0];
        console.log(domain);
        await page.locator('#username').fill(domain);
        console.log( await page.locator('#username').inputValue());

     

   

})