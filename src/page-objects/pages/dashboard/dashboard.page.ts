import { allure } from 'allure-playwright';
import { getLocator, getLocatorByRole } from '@utils/base/ui-element';
import { logger } from '@utils/log/custom-logger';
import { isElementVisible, waitForElementToBeVisible } from '@utils/base/ui-waits';
import { click } from '@utils/base/ui-actions';

export class DashBoardPage {
  // #region Declare elements of the page
  private readonly logoutConfirmDialog = '#form-dialog-title';
  private readonly noBtn = () => getLocatorByRole('button', { name: 'No' });
  private readonly userTabBtn = () => getLocator('button[data-testid="dashboard-users-tab-button"]');
  private readonly walkMePlayer = () => getLocator('#walkme-player');

  // #endregion

  async initDashboardUrl() {
    await allure.step('Navigate to dashboard url', async () => {
      await waitForElementToBeVisible(this.walkMePlayer());
    });
    return this;
  }

  // #region Actions
  async clickNoFromLoggingOut() {
    await allure.step(`Choose not to log out from other sessions`, async () => {
      if (await isElementVisible(this.logoutConfirmDialog)) {
        await click(this.noBtn());
      } else {
        logger.debug(`Logout Confirm Dialog not displayed`);
      }
    });
    return this;
  }

  async goToUsersTab() {
    await allure.step(`navigate to Users tab`, async () => {
      await click(this.userTabBtn());
    });
  }
}
