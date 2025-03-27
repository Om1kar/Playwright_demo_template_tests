const path = require('path');

exports.AIPdfPage = class AIPdfPage {
    constructor(page) {
        this.page = page;
        this.viewChats = page.locator("//a[text()='View Chats']");
        this.aiPdfLink = page.locator("//a[text()='AI PDF']");
        this.choosePdf = page.locator("//button[@aria-label='assignee']");
        this.clickUpload = page.locator("label[for='fileUpload']");
        this.locateFile = page.locator("input[type='file']");
        this.seeHistory = page.locator("//button[text()='See History']");
        this.questionInput = page.locator("textarea[placeholder='Ask question...']");
        this.sendQuestion = page.locator('button[type="submit"]');
        this.dashbaord = page.locator("//a[text()='Dashboard']");
    }

    async uploadFile() {
        await this.aiPdfLink.click();
        await this.page.waitForLoadState('domcontentloaded');
        const filePath = path.join(__dirname, 'Files', 'Linux-Tutorial.pdf');
        await this.clickUpload.click();
        await this.locateFile.setInputFiles(filePath);
        await this.page.waitForLoadState('networkidle');
        await this.questionInput.fill('hello');
        await this.sendQuestion.click();
        await this.page.waitForTimeout(5000);

    }

    async selectPdf() {
        await this.dashbaord.click();
        await this.viewChats.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.choosePdf.click();

        this.locatePdf = "//div[@role='option']//span";
        const selectPdfDropdown = await this.page.$$(this.locatePdf)
        for (const option of selectPdfDropdown) {
            const locatePdf = await option.textContent();
            console.log(locatePdf);

            if (locatePdf.includes('Chat with Linux-Tutorial.pdf')) {
                await option.click();
                break;
            }
        }

        await this.page.waitForTimeout(2000);
        await this.seeHistory.click();
        await this.questionInput.fill('hello');
        await this.sendQuestion.click();
        await this.page.waitForLoadState('domcontentloaded');

    }

}