const { test, expect } = require('@playwright/test');
import { LoginPage } from '../TemplatePages/LoginPage';
import { AIPdfPage } from '../TemplatePages/AIPdfPage';
import { MembersPage } from '../TemplatePages/MembersPage';
import { ApiKeyPage } from '../TemplatePages/ApiKeyPage';
import { BillingPage } from '../TemplatePages/BillingPage';
import { Dashboardpage } from '../TemplatePages/DashboardPage';


test.beforeEach('Verify log-in operation', async ({ page }) => {

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login();

});

test('Members page', async ({ page }) => {

    const members = new MembersPage(page);
    await members.inviteMembers();
    //await page.close();
});

test('Create/delete Api Key', async ({ page }) => {

    const apiKey = new ApiKeyPage(page);
    await apiKey.generateApiKey();
    // await page.close();
});

test('Billing Page', async ({ page }) => {
    const billing = new BillingPage(page);
    await billing.updateBilling();
    //await page.close();

});

test.skip('Upload Pdf and start conversation', async ({ page }) => {

    const aipdf = new AIPdfPage(page);
    await aipdf.uploadFile();
    await aipdf.selectPdf();

});

test('Switch Language and Update User Account', async ({ page }) => {

    const dashboard = new Dashboardpage(page);
    await dashboard.switchLanguage();
    await dashboard.profileMenu();
    await dashboard.logoutUser();
    await page.close();
});
