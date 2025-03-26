exports.ApiKeyPage = class ApiKeyPage {
    constructor(page) {
        this.page = page;
        this.navigateToPage = page.locator("//a[normalize-space()='API Keys']");
        this.createNew = page.locator("//button[normalize-space()='Create New Key']");
        this.apiKeyName = page.locator("input[id$='-form-item']");
        this.createKey = page.locator("button[type='submit']");

    }

    async generateApiKey() {
        await this.navigateToPage.click();
        await this.createNew.click();
        await this.apiKeyName.fill('key1');
        await this.createKey.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}