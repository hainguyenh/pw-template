import { type Locator } from '@playwright/test';

export default class UiElement {
  name: string | undefined;
  private readonly _locator: Locator;

  get locator(): Locator {
    return this._locator;
  }

  constructor(locator: Locator, name?: string) {
    this.name = name;
    this._locator = locator;
  }
}
