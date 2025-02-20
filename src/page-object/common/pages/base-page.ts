import test, { expect } from "@playwright/test";
import { BasePageObject } from "../base-page-object";
import { TemplateStringValues } from "../../../types/template-string-values";
import { TemplateStringUtils } from "../../../utils/template-string-utils";


export abstract class BasePage extends BasePageObject {
  protected abstract readonly url: string;

  
  public async open(templateValues?: TemplateStringValues) {
    const url = this.getUrl(templateValues);

    await test.step(`Открыть страницу "${this.name}" по ссылке "${this.baseURL}${url}"`, async () => {
      await this.page.goto(url);
    });

    await this.isLoaded();
  }

  public async isLoaded() {
    await test.step(`Страница "${this.name}" успешно загрузилась`, async () => {
      await this.shouldHaveValidURL();
    });
  }

  private async shouldHaveValidURL() {
    const urlRegex = TemplateStringUtils.formatToRegex(this.url);

    await test.step(`URL текущей страницы "${this.baseURL}${this.url}"`, async () => {
      await expect(this.page).toHaveURL(urlRegex);
    });
  }

  private getUrl(values?: TemplateStringValues): string {
    return values ? TemplateStringUtils.format(this.url, values) : this.url;
  }


  private get baseURL(): string {
    return test.info().project.use.baseURL as string;
  }
}
