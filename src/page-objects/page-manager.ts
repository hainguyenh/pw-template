import { test as baseTest } from '@test-setup';
import { LoginPage } from '@pages/login/login.page';
import { DashBoardPage } from '@pages/dashboard/dashboard.page';

type PageObject = {
  loginPage: LoginPage;
  dashboardPage: DashBoardPage;
};

export const test = baseTest.extend<PageObject>({
  // handle page object initialization
  loginPage: async ({}, use) => {
    await use(new LoginPage());
  },

  dashboardPage: async ({}, use) => {
    await use(new DashBoardPage());
  },
});

export const expect = test.expect;
