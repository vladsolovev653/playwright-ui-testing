import test from "@playwright/test";
import { LoginPage } from "../page-object/pages/login-page";
import { User } from "../types/user";


test('Авторизация валидным пользователем', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const adminUser: User = {
    username: process.env.ADMIN_USER as string,
    password: process.env.ADMIN_PASSWORD as string
  };

  await loginPage.open();
  await loginPage.login(adminUser);
});
