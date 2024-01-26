import { expect } from '@playwright/test';

export class SearchLocationPage {
  constructor(page) {
    this.page = page;

    //locators
    this.zipcodeInput = page.getByPlaceholder('ZIP code, neighborhood or city');

    this.searchButton = page
      .getByRole('main')
      .getByLabel('Search', { exact: true });
  }

  async searchZipCode() {
    await this.zipcodeInput.waitFor();
    await this.zipcodeInput.fill('92103');

    await this.searchButton.waitFor();
    await this.searchButton.click();
    // await this.page.keyboard.press('Enter');
  }
}
