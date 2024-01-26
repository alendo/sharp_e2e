import { expect } from '@playwright/test';
import exp from 'constants';

export class SearchDoctorPage {
  constructor(page) {
    this.page = page;

    //locators
    this.zipcodeInput = page.getByPlaceholder('ZIP code, neighborhood or city');
    this.keywordInput = page.getByPlaceholder(
      'Search by specialty, name or keyword'
    );
    this.searchButton = page
      .getByRole('main')
      .getByLabel('Search', { exact: true });
    this.sortDropdown = page.getByLabel('SortSort by locationSort by').nth(1);
    this.resultOptions = page.locator('div:nth-child(2) > div:nth-child(3)');
    this.bookAppointmentButton = page.getByRole('button', {
      name: 'Book appointment',
    });
    this.doctorInfo = page.getByRole('heading', { name: 'Location and phone' });
    this.appointmentForm = page.getByTestId('provider-appointment-form');
  }

  async enterKeyword() {
    await this.keywordInput.click();
    await this.keywordInput.type('pediatrician', { delay: 400 });
  }

  async enterZipcode() {
    await this.zipcodeInput.click();
    await this.zipcodeInput.type('92103', { delay: 400 });
  }

  async clickSearch() {
    await this.searchButton.waitFor();
    await this.searchButton.click();
  }

  async assertResultsDropdown() {
    await expect(this.sortDropdown).toBeVisible();
  }

  async clickResult() {
    await this.resultOptions.waitFor();
    await this.resultOptions.click();
    await expect(this.doctorInfo).toBeVisible();
  }

  async bookDoctorAppointment() {
    await this.bookAppointmentButton.waitFor();
    await this.bookAppointmentButton.click();
    await expect(this.appointmentForm).toBeVisible();
  }
}
