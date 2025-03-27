
const {INVITE_EMAIL: inviteEmail} = process.env;

exports.MembersPage = class MembersPage {
    constructor(page) {
        this.page = page;
        this.membersLink = page.locator("//a[normalize-space()='Members']");
        this.inviteButton = page.locator("//button[text()='Invite User']");
        this.emailInput = page.locator("//input[@placeholder='Email ID']");
        this.selectRoleDropdown = page.locator("//button[@aria-label='role']");
     //   this.selectRole = page.locator("//div[@role='option']");
        this.finalInvite = page.locator("//button[@type='submit']");
        this.revokeInviteButton = page.locator("//button[@aria-label='Revoke Invitation']");
        this.cancelButton = page.locator("//button[text()='Cancel']");
       
    }

    async inviteMembers() {
        await this.membersLink.click();
        await this.inviteButton.click();
        await this.emailInput.fill(inviteEmail); 
        await this.selectRoleDropdown.click();
        await this.page.waitForTimeout(2000);

        this.selectRole = "//div[@role='option']";
        const selectRoleDropdown = await this.page.$$(this.selectRole)
        for (let option of selectRoleDropdown) {
            const selectRole = await option.textContent();
            console.log(selectRole);
            if (selectRole.includes('Admin')) {
                await option.click();
                break;
            }
        }

        await this.finalInvite.click();
        await this.revokeInviteButton.click();
        await this.cancelButton.click();
        await this.page.waitForLoadState('networkidle');
        
    }
}