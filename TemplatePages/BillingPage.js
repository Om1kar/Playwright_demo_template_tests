exports.BillingPage =  class BillingPage{
    constructor(page) {
        this.page = page;
        this.navigateToPage = page.locator("//a[normalize-space()='Billing']");
        this.switchToYearly = page.locator("(//button[normalize-space()='Yearly'])");
        this.subscribe = page.locator("(//button[normalize-space()='Subscribe'])[3]");
        this.navigateBack = page.locator("//span[text()='Back']");
    }
    async updateBilling() {
        await this.navigateToPage.click();
        await this.switchToYearly.click();
        await this.subscribe.click();
        await this.navigateBack.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
