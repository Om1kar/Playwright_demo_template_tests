
const { test, expect } = require('@playwright/test');
import { LoginPage } from '../TemplatePages/LoginPage';
import { AIPdfPage } from '../TemplatePages/AIPdfPage';
import { MembersPage } from '../TemplatePages/MembersPage';
import { ApiKeyPage } from '../TemplatePages/ApiKeyPage';
import { BillingPage } from '../TemplatePages/BillingPage';
import { DashboardPage } from '../TemplatePages/DashboardPage';
import { OrgSettingsPage } from '../TemplatePages/OrgSettingsPage';


test.describe.serial('End-to-End Testing', () => {
    let context, page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

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

        const aiPdf = new AIPdfPage(page);
        await aiPdf.uploadFile();
        await aiPdf.selectPdf();

    });


    test('Update Organization Details', async () => {

        const orgSettings = new OrgSettingsPage(page);
        await orgSettings.updateOrgDetails();
        await orgSettings.deleteOrg();

    });


    test('Switch Language and Update User Account', async () => {

        const dashboard = new DashboardPage(page);
        await dashboard.switchLanguage();
        await dashboard.profileMenu();
        await dashboard.logoutUser();

    });


    test.afterAll(async () => {
        await context.close();

    });


});
