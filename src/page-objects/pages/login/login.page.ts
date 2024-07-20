import { allure } from 'allure-playwright';
import { getEnv } from '@testdata/env-helper';
import { logger } from '@utils/log/custom-logger';
import { getLocator, getLocatorByRole, getLocatorByText } from '@utils/base/ui-element';
import { gotoURL } from '@utils/base/page-utils';
import { isElementVisible, waitForElementToBeHidden, waitForElementToBeVisible } from '@utils/base/ui-waits';
import { click, fill } from '@utils/base/ui-actions';

export class LoginPage {
  // #region Declare elements of the page
  private readonly emailTxt;
  private readonly nonSsoBtn;
  private readonly passwordTxt;
  private readonly signInBtn;
  private readonly requestAnOsAccountBtn;

  // #endregion
  constructor() {
    this.emailTxt = getLocator('input[name=username]');
    this.nonSsoBtn = getLocatorByText('Non-SSO');
    this.passwordTxt = getLocator('input[name=password]');
    this.signInBtn = getLocatorByRole('button', { name: 'SIGN IN' });
    this.requestAnOsAccountBtn = getLocator('text=Request an OS Account');
  }

  // #region Actions / Navigations
  /**
   * Launch the app with the URL
   */
  public async launchApp(): Promise<void> {
    const url: string = getEnv.BASE_URL;
    logger.info(`Launching app via url: ${url}`);
    logger.info(`Screenshot dir: ${getEnv.SCREENSHOT_DIR}`);
    logger.info(`Base dir: ${getEnv.BASE_RESULT_DIR}`);
    logger.info(`Log dir: ${getEnv.LOG_DIR}`);
    await gotoURL(url);
    await waitForElementToBeVisible(this.emailTxt);
  }

  /**
   * Fill the login form with the username and password - Non-SSO
   * @param username
   * @param password
   */
  async fillForm(username: string, password: string) {
    await allure.step(`Fill the login form with the username and password`, async () => {
      await fill(this.emailTxt, username);
      if (await isElementVisible(this.nonSsoBtn)) {
        await click(this.nonSsoBtn);
      }
      await fill(this.passwordTxt, password);
    });

    return this;
  }

  /**
   * Click on the Sign In button
   */
  public async signIn() {
    await allure.step(`Sign In to the application`, async () => {
      await click(this.signInBtn);
    });
    await allure.step(`Wait for the page to load`, async () => {
      await waitForElementToBeHidden(this.signInBtn, { timeout: 10 * 1000 });
    });
    return this;
  }

  public async requestNewAccount(): Promise<void> {
    await click(this.requestAnOsAccountBtn);
  }

  // #endregion
}
