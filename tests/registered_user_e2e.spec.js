import { test } from '@playwright/test';
import { loginDetails } from '../data/loginDetails';
import { LoginPage } from '../pages/login-page';
import { AccountMenu } from '../pages/account-menu-page';
import { SearchDoctorPage } from '../pages/search-doctor-page';
import { SearchLocationPage } from '../pages/search-location-page';
import { TopNavigation } from '../pages/global-nav-page';
import { log } from 'console';

test('Registered user end-to-end journey', async ({ page }) => {
  // create new instance of login page
  const loginPage = new LoginPage(page);
  await loginPage.visitLogin();
  await loginPage.logInWithCredentials(loginDetails);

  // navigates to Search For Doctor page
  const accountMenu = new AccountMenu(page);
  await accountMenu.openAccountMenu();
  await accountMenu.navigateToSearchForDoctor();

  // searches for a doctor and books appointment
  const searchDoctorPage = new SearchDoctorPage(page);
  await searchDoctorPage.enterKeyword();
  await searchDoctorPage.enterZipcode();
  await searchDoctorPage.clickSearch();
  await searchDoctorPage.assertResultsDropdown();
  await searchDoctorPage.clickResult();
  await searchDoctorPage.bookDoctorAppointment();

  // logs out
  const topNavigation = new TopNavigation(page);
  await topNavigation.logout();
});
