const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail:"pallavi.kuligod@gmail.com",userPassword:"Pass1234"};
const orderPayload = {orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

    })

test('Client Login Test', async ({page}) => {
    
    const email = 'pallavi.kuligod@gmail.com';
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
   
    await page.goto('https://rahulshettyacademy.com/client');

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 

    await page.pause();



   
     

})


