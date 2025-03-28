

const path = require('path');

exports.OrgSettingsPage = class OrgSettingsPage {
    constructor(page) {
        this.page = page;
        this.setting = page.locator('//a[normalize-space()="Settings"]');
        this.upload = page.locator("//button[normalize-space()='Upload']");
        this.filetype = page.locator('input[type="file"]');
        this.orgName = page.locator('input[id$="-form-item"]');
        this.updateName = page.locator('button[type="submit"]');
        this.removeImage = page.locator("//button[text()='Remove']");
        this.delete = page.locator("//button[text()='Delete Organization']");
        this.cancelDeletion = page.locator("//button[text()='Cancel']");
    }

    async updateOrgDetails() {
        await this.setting.click();
        await this.upload.click();


        const uploadOrgImage = await this.filetype;
        const selectImage = path.join(__dirname, 'Files', 'techie.jpg');
        await uploadOrgImage.setInputFiles(selectImage);
        await this.page.waitForTimeout(2000);

        await this.orgName.fill('Updated Name');
        await this.updateName.click();
        await this.page.waitForTimeout(2000);
    }


    async deleteOrg() {
        console.log("Deleting Organization");
        await this.delete.click();
        await this.page.waitForTimeout(2000);
        await this.cancelDeletion.click();
        await this.page.waitForTimeout(2000);
    }
}