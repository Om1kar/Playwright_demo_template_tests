const {
    EMAIL: email, PASSWORD: password,
    BASE_URL: baseUrl
} = process.env;
exports.LoginPage = class LoginPage{

    constructor(page) {
        this.page = page;
        this.loginLink = "//a[text()='Get Started']";  
        this.switchToLoginTab = "//button[text()='Password']";  
        this.emailInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.statusMessage = this.page.locator('div[role="status"]');

    }

    async gotoLoginPage() {
        await this.page.goto(baseUrl);

    }

    async login() {
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.switchToLoginTab).click();
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
        await this.page.waitForLoadState('networkidle');
     
    }

}