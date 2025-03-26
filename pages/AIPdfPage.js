const path = require('path');

exports.AIPdfPage = class AIPdfPage {
    constructor(page) {
        this.page = page;
        this.viewChats = page.locator("//a[text()='View Chats']");
        this.aiPdfLink = page.locator("//a[text()='AI PDF']");
        this.choosePdf = page.locator('button[aria-label="assignee"]');
        this.clickUpload = page.locator("label[for='fileUpload']");
        this.locateFile = page.locator("input[type='file']");
        this.seeHistory = page.locator("//button[text()='See History']");
        this.questionInput = page.locator("textarea[placeholder='Ask question...']");
        this.sendQuestion = page.locator('button[type="submit"]');
    }

    async uploadFile() {
        await this.viewChats.click();
        const filePath = path.join(__dirname, 'Files', 'Linux-Tutorial.pdf');
        await this.clickUpload.click();
        await this.locateFile.setInputFiles(filePath);
        await this.page.waitForLoadState('networkidle');
        await this.questionInput.fill('hello');
        await this.sendQuestion.click();
        await this.page.waitForLoadState('networkidle');

    }

    async selectPdf() {
        await this.aiPdfLink.click();
        await this.choosePdf.click();

        const selectPdfDropdown = await this.page.$$("//div[@role='option']//span");
        let pdfFound = false;

        for (const option of selectPdfDropdown) {
            const selectPdf = (await option.textContent())?.trim();
            console.log(selectPdf);
            if (selectPdf.includes('Chat with Linux-Tutorial.pdf')) {
                await option.click();
                pdfFound = true;
                break;
            }
        }
        if (!pdfFound) {
            throw new Error('Pdf not found');
        }
        await this.seeHistory.click();
        await this.questionInput.fill('hello');
        await this.sendQuestion.click();
        await this.page.waitForLoadState('networkidle');

    }

}