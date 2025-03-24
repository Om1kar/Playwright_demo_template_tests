const { test, expect } = require('@playwright/test')

const path = require('path');
const { EMAIL: email, INVITE_EMAIL: inviteEmail, PASSWORD: password,
    BASE_URL: baseUrl } = process.env;


test.beforeEach('Log in Operation', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: 'Let\'s Get Started' }).click();

    //login
    await page.getByRole('tab', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click({ force: true });
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Signed in successfully.' })).toBeVisible();
});


test('Members- Invite User/Revoke Invitaion', async ({ page }) => {

    //Invite User
    await page.locator("//a[text()='Members']").click();
    await page.locator("//button[text()='Invite User']").click();
    await page.locator("//input[@placeholder='Email ID'] ").fill(inviteEmail);
    await page.locator("//button[@aria-label='role']").click();

    const selectRoleDropdown = await page.$$("//div[@role='option']//span")
    for (let option of selectRoleDropdown) {
        const selectRole = (await option.innerText()).trim();  // for get text and remove extra space
        console.log(selectRole);

        if (selectRole.includes('Admin')) {
            await option.click();
            break;
        }
    }
    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Invited successfully.' })).toBeVisible();

    await page.locator("//button[@aria-label='Revoke Invitation']").click();
    await page.locator("//button[text()='Continue']").click();
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Invitation revoked successfully.' })).toBeVisible();

});


test('Upload Pdf', async ({ page }) => {

    await page.locator("//a[text()='View Chats']").click();
    await page.locator("label[for='fileUpload']").click();

    const uploadPdf = await page.locator('input[type="file"]');

    const selectPdf = path.join(__dirname, 'UploadFiles', 'Linux-Tutorial.pdf');
    await uploadPdf.setInputFiles(selectPdf);

});



test('Select pdf and Send message', async ({ page }) => {

    await page.locator("//a[text()='View Chats']").click();
    await page.locator("button[aria-label='assignee']").click();

    const selectPdfDropdown = await page.$$("//div[@role='option']//span")
    for (let option of selectPdfDropdown) {
        const selectPdf = (await option.innerText()).trim();  // for geting text and removing extra space
        console.log(selectPdf);

        if (selectPdf.includes('Chat with Linux-Tutorial.pdf')) {
            await option.click();  // click if match
            break;
        }
    }

    await page.locator("//button[text()='See History']").click();
    await page.waitForLoadState('networkidle')
    await page.getByPlaceholder('Ask question...').fill('hello');
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(5000);
});


test('Create/delete Api Key', async ({ page }) => {

    //create api key 
    await page.getByRole('link', { name: 'API Keys' }).click();
    await page.getByRole('button', { name: 'Create New Key' }).click();
    await page.locator('input[id$="-form-item"]').fill('key');
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded')
});


test('Billing Page', async ({ page }) => {
    // //billing page = click on basic yearly plan and navigate back to billing page
    await page.locator('//a[normalize-space()="Billing"]').click();
    await page.locator('(//button[normalize-space()="Yearly"])[1]').click();
    await page.waitForLoadState('domcontentloaded')
    await page.locator("(//button[normalize-space()='Subscribe'])[3]").click();
    await page.locator("//span[text()='Back']").click();
    await page.waitForLoadState('domcontentloaded')
});


test('Update Organization', async ({ page }) => {
    await page.locator('//a[text()="Settings"]').click();
    await page.locator("//button[text()='Upload']").click();

    const uploadOrgImage = await page.locator('input[type="file"]');

    // path of the image to be uploaded
    const selectImage = path.join(__dirname, 'UploadFiles', 'techie.jpg');

    // Upload the image file
    await uploadOrgImage.setInputFiles(selectImage);
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Organization updated successfully.' })).toBeVisible();

    //Update Org Name
    await page.locator('input[id$="-form-item"]').fill('Updated name');
    await page.locator('button[type="submit"]').click();

    //Remove org Image
    await page.locator("//button[text()='Remove']").click();
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Organization updated successfully.' })).toBeVisible();

    //Delete Org = click on cancel
    await page.locator("//button[text()='Delete Organization']").click();
    await page.waitForTimeout(3000);
    await page.locator("//button[text()='Cancel']").click();

});


test('Manage User Account and Upload Image ', async ({ page }) => {

    await page.locator("//button[@aria-label='User profile']").click();
    await page.locator("//a[text()='My Account']").click();
    await page.getByPlaceholder("Enter first name").fill('New');
    await page.getByPlaceholder("Enter first name").fill('Name');
    await page.locator("//button[text()='Update']").click();
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Profile updated successfully.' })).toBeVisible();
    //   await page.getByPlaceholder("New Password").fill(MY_CREDENTIALS.password);
    //   await page.getByPlaceholder("Confirm Password").fill(MY_CREDENTIALS.password);
    await page.locator('button[type="submit"]').click();
    await page.locator("//button[text()='Delete Profile']").click();
    await page.locator("//button[text()='Cancel']").click();

    await page.locator("//button[text()='Upload']").click();
    const uploadProfilePic = await page.locator('input[type="file"]');
    const selectImage = path.join(__dirname, 'UploadFiles', 'techie.jpg');
    await uploadProfilePic.setInputFiles(selectImage);
    await expect(page.locator("//div[@role='status']").filter({ hasText: 'Profile updated successfully.' })).toBeVisible();

});


test('Admin panel', async ({ page }) => {
    await page.locator("//button[@aria-label='User profile']").click();
    await page.locator("//a[@href='/en/super-admin/users']").click();
    await page.getByRole('button', { name: 'Remove' }).nth(0).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
    await page.close();
});
