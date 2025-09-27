const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail:"pallavi.kuligod@gmail.com",userPassword:"Pass1234"};
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
   const loginResponse =  await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson.token);
    token = loginResponseJson.token;

    })


test.beforeEach(() => {

});

test.only('Client Login Test', async ({page}) => {
    
    // await page.goto('https://rahulshettyacademy.com/client');
    
    //  await page.locator('#userEmail').fill('pallavi.kuligod@gmail.com');
    //     await page.locator('#userPassword').fill('Pass1234');
    //  await page.locator("[value='Login']").click();
    //  await page.waitForLoadState('networkidle');
    const email = 'pallavi.kuligod@gmail.com';
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client');
     await page.locator('.card-body b').first().waitFor();
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

test('Child window Test', async ({browser}) => {
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