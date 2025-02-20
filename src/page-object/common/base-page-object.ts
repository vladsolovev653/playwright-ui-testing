import { Page } from "@playwright/test";


export abstract class BasePageObject {
  protected readonly abstract name: string;

  constructor(protected readonly page: Page) {}
}
