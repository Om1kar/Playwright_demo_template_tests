exports.Dashboardpage = class DashboardPage {
    constructor(page) {
        this.page = page;
        this.languageSwitcher = page.locator("//button[@aria-label='Language Switcher']");
        this.userProfileIcon = page.locator("//button[@aria-label='User profile']");
        this.myAccount = page.locator("//a[text()='My Account']");
        this.FirstName = page.getByPlaceholder("Enter first name");
        this.LastName = page.getByPlaceholder("Enter last name");
        this.update = page.locator("//button[text()='Update']");
        this.logout = page.locator("//div[.='Logout']");

    }

    async switchLanguage() {
        await this.languageSwitcher.click();
        const selectLanguageDropdown = await this.page.$$("//div[@role='option']//span");

        let selectEnglish = false;
        for (const option of selectLanguageDropdown) {
            const selectLanguage = (await option.textContent())?.trim();
            console.log(selectLanguage);
            if (selectLanguage.includes('English')) {
                await option.click();
                selectEnglish = true;
                break;
            }
        }

        if (!selectEnglish) {
            throw new Error('English language option not found');
        }
        await this.page.waitForTimeout(5000);
    }

    async profileMenu() {
        await this.userProfileIcon.click();
        await this.myAccount.click();
        await this.FirstName.fill('User');
        await this.LastName.fill('Account');
        await this.update.click();

    }

    async logoutUser() {
        await this.userProfileIcon.click();
        await this.logout.click();
        await this.page.waitForTimeout(2000);
    }
}
