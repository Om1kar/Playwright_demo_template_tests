const { test, expect } = require('@playwright/test');
import { LoginPage } from '../TemplatePages/LoginPage';
import { AIPdfPage } from '../TemplatePages/AIPdfPage';
import { MembersPage } from '../TemplatePages/MembersPage';
import { ApiKeyPage } from '../TemplatePages/ApiKeyPage';
import { BillingPage } from '../TemplatePages/BillingPage';
import { Dashboardpage } from '../TemplatePages/DashboardPage';
import { OrgSettingsPage } from '../TemplatePages/OrgSettingsPage';

test.describe.serial('End-to-End Testing', () => {
    let  context, page;
    
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
        page = await context.newPage();
        page = await browser.newPage();

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login();

});

test('Members page', async () => {

    const members = new MembersPage(page);
    await members.inviteMembers();

});

test('Create/delete Api Key', async () => {

    const apiKey = new ApiKeyPage(page);
    await apiKey.generateApiKey();
    
});

test('Billing Page', async () => {
    const billing = new BillingPage(page);
    await billing.updateBilling();
    

});

test('Upload Pdf and start conversation', async () => {

    const aipdf = new AIPdfPage(page);
    await aipdf.uploadFile();
    await aipdf.selectPdf();

});

test('Update Organization Details', async () => {

    const orgsettingspage = new OrgSettingsPage(page);
    await orgsettingspage.updateOrgDetails();
    await orgsettingspage.deleteOrg();
    
});

test('Switch Language and Update User Account', async () => {

    const dashboard = new Dashboardpage(page);
    await dashboard.switchLanguage();
    await dashboard.profileMenu();
    await dashboard.logoutUser();
    await page.waitForTimeout(4000);

});

test.afterAll(async () => {
    await context.close();
});

});
