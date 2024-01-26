import { expect } from '@playwright/test';
import exp from 'constants';
import { loginDetails } from '../data/loginDetails';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // locators
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#login-button');
    this.header = page.locator('#sharp-account-home-link');
  }

  async visitLogin() {
    await this.page.goto('https://account.sharp.com/');
  }

  async logInWithCredentials(loginDetails) {
    await this.emailInput.waitFor();
    await this.emailInput.fill(loginDetails.email);

    await this.passwordInput.waitFor();
    await this.passwordInput.fill(loginDetails.password);

    await this.signInButton.waitFor();
    await this.signInButton.click();

    //assert that the page url is correct
    await expect(this.page).toHaveURL(/account/);
  }
}
