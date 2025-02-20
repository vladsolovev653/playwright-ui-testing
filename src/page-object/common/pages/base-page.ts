import test, { expect } from "@playwright/test";
import { BasePageObject } from "../base-page-object";
import { TemplateStringValues } from "../../../types/template-string-values";
import { formatTemplateString } from "../../../utils/format-template-string";


export abstract class BasePage extends BasePageObject {
  protected abstract readonly url: string | RegExp;

  
  public async open(templateValues?: TemplateStringValues) {
    const url = this.getUrl(templateValues) as string;

    await test.step(`Открыть страницу "${this.name}" по ссылке "${this.baseURL}${url}"`, async () => {
      await this.page.goto(url);
    });

    await this.isLoaded(templateValues);
  }

  public async isLoaded(templateValues?: TemplateStringValues) {
    await test.step(`Страница "${this.name}" успешно загрузилась`, async () => {
      await this.shouldHaveValidURL(templateValues);
    });
  }

  private async shouldHaveValidURL(templateValues?: TemplateStringValues) {
    const url = this.getUrl(templateValues);

    await test.step(`URL текущей страницы "${this.baseURL}${url}"`, async () => {
      await expect(this.page).toHaveURL(url);      
    });
  }


  private getUrl(values?: TemplateStringValues): string | RegExp {
    if (typeof(this.url) === 'string') {
      return values ? formatTemplateString(this.url, values) : this.url;
    }

    return this.url;
  }


  private get baseURL(): string {
    return test.info().project.use.baseURL as string;
  }
}
