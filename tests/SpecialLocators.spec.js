import {test, expect} from '@playwright/test';


test('Special Locators Test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("123");
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button').click();
    

})