import { Locator, Page } from "@playwright/test";
import { BasePageObject } from "../base-page-object";


export abstract class BaseElement extends BasePageObject {
  constructor(page: Page, private readonly selector: string) {
    super(page);
  }

  public async click() {
    const locator = this.getLocator()  

    await locator.click();
  }

  protected getLocator(): Locator {
    return this.page.locator(this.selector);
  } 
}
