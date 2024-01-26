import { expect } from '@playwright/test';

export class AccountMenu {
  constructor(page) {
    this.page = page;

    //locators
    this.hamburgerMenu = page.locator('#mobile-menu-drawer-open');
    this.findADoctorLink = page.getByRole('link', { name: 'Find a Doctor' });
    this.menu = page.locator('#mobile-nav-login');
  }

  async openAccountMenu() {
    await this.hamburgerMenu.waitFor();
    await this.hamburgerMenu.click();
    await expect(this.menu).toBeVisible();
  }

  async navigateToSearchForDoctor() {
    await this.findADoctorLink.waitFor();
    await this.findADoctorLink.click();
    await expect(this.page).toHaveURL('https://www.sharp.com/doctors');
  }
}
