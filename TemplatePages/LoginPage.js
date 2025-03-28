
import { expect } from '@playwright/test';

const {
    EMAIL: email, PASSWORD: password, BASE_URL: baseUrl } = process.env;

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginLink = page.locator("//a[text()='Get Started']");
        this.switchToLoginTab = page.locator("//button[text()='Password']");
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.statusMessage = page.locator('div[role="status"]');

    }

    async gotoLoginPage() {
        await this.page.goto(baseUrl);

    }

    async login() {
        await this.loginLink.click();
        await this.switchToLoginTab.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.statusMessage).toHaveText('Signed in successfully.');
        await this.page.waitForLoadState('networkidle');

    }

}