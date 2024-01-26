import { expect } from '@playwright/test';
import exp from 'constants';

export class TopNavigation {
  constructor(page) {
    this.page = page;

    //locators
    this.signInButton = page.getByRole('link', { name: 'Sign in' });
    this.hamburgerMenu = page.locator('#mobile-menu-drawer-open');
    this.signOutButton = page.getByRole('link', { name: 'Sign out' });
    this.loggedOutPageHeader = page.getByRole('heading', {
      name: 'Sign in to your Sharp Account',
    });
  }

  async logout() {
    await this.signInButton.waitFor();
    await this.signInButton.click();
    await this.hamburgerMenu.click();

    await this.signOutButton.waitFor();
    await this.signOutButton.click();
    await expect(this.loggedOutPageHeader).toBeVisible();
  }
}
