import test, { Locator, Page } from "@playwright/test";
import { User } from "../../types/user";


export class LoginPage {
  private readonly url = '/';

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.locator('#user-name');
    this.passwordInput = this.page.locator('#password');
    this.loginBtn = this.page.locator('#login-button');
  }

  public async open() {
    await test.step(`Открыть страницу по ссылке "${this.url}"`, async () => {
      await this.page.goto(this.url);      
    });
  }

  public async login(userData: User) {
    await test.step(`Авторизоваться пользователем "${userData.username}"`, async () => {
      await this.usernameInput.fill(userData.username);
      await this.passwordInput.fill(userData.password);
      await this.loginBtn.click();
    });
  }
}
