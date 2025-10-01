const {test, expect, request} = require('@playwright/test');

let webContext;
test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
      await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('pallavi.kuligod@gmail.com');
        await page.locator('#userPassword').fill('Pass1234');
     await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await context.storageState({path:'state.json'});
        webContext = await browser.newContext({storageState:'state.json'});

});



test('Client Login Test', async ({}) => {
    const page = await webContext.newPage();
    const email = 'pallavi.kuligod@gmail.com';
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client');

    //  await page.locator('.card-body b').first().waitFor();
     const titles = await page.locator('.card-body b').allTextContents();
     console.log(titles);

    const count = products.count();
    for(let i=0;i<await count;i++){
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            console.log('add to cart clicked');
            break;
        }
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
  page.locator('div.field', { hasText: 'Name on Card' }).locator('input').fill('Alice Example');
    await page.locator('[name="coupon"]').fill('rahulshettyacademy');

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const options = page.locator('.ta-results');
    await options.waitFor();
    const optionsCount = await options.locator('button').count();
    for(let i=0;i<optionsCount;i++){
        let text = await options.locator('button').nth(i).textContent();
        if(text === " India"){
            await options.locator('button').nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.action__submit').click();
    expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator('label[routerlink="/dashboard/myorders"]').click();
    await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


    await page.pause();



   
     

})