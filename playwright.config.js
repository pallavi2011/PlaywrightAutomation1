// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 4000
  },
  
 
  
  reporter: 'html',
  
  use: {
   
browserName: 'chromium',
headless: false,
screenshot: 'on',
trace: 'retain-on-failure',
    
    
  },

  

  
});

module.exports = config;
