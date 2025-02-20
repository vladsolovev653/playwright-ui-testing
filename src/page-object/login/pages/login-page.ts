import test from "@playwright/test";
import { User } from "../../../types/user";
import { BasePage } from "../../common/pages/base-page";
import { Input } from "../../common/elements/input";
import { Button } from "../../common/elements/button";
import { InventoryPage } from "../../inventory/pages/inventory-page";


export class LoginPage extends BasePage {
  protected readonly url = '/';
  protected readonly name = 'Страница авторизации';

  private readonly usernameInput = new Input(this.page, '#user-name');
  private readonly passwordInput = new Input(this.page, '#password');
  private readonly loginBtn = new Button(this.page, '#login-button');


  public async login(userData: User): Promise<InventoryPage> {
    await test.step(`Авторизоваться пользователем "${userData.username}"`, async () => {
      await this.usernameInput.fill(userData.username);
      await this.passwordInput.fill(userData.password);
      await this.loginBtn.click();
    });

    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.isLoaded();
    return inventoryPage;
  }
}
