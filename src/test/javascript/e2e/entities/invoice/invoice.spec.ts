import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { InvoiceComponentsPage, InvoiceUpdatePage } from './invoice.page-object';

describe('Invoice e2e test', () => {
    let navBarPage: NavBarPage;
    let invoiceUpdatePage: InvoiceUpdatePage;
    let invoiceComponentsPage: InvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invoices', () => {
        navBarPage.goToEntity('invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(invoiceComponentsPage.getTitle()).toMatch(/storeApp.invoice.home.title/);
    });

    it('should load create Invoice page', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceUpdatePage = new InvoiceUpdatePage();
        expect(invoiceUpdatePage.getPageTitle()).toMatch(/storeApp.invoice.home.createOrEditLabel/);
        invoiceUpdatePage.cancel();
    });

    /* it('should create and save Invoices', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(invoiceUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        invoiceUpdatePage.setDetailsInput('details');
        expect(invoiceUpdatePage.getDetailsInput()).toMatch('details');
        invoiceUpdatePage.statusSelectLastOption();
        invoiceUpdatePage.paymentMethodSelectLastOption();
        invoiceUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(invoiceUpdatePage.getPaymentDateInput()).toContain('2001-01-01T02:30');
        invoiceUpdatePage.setPaymentAmountInput('5');
        expect(invoiceUpdatePage.getPaymentAmountInput()).toMatch('5');
        invoiceUpdatePage.setCodeInput('code');
        expect(invoiceUpdatePage.getCodeInput()).toMatch('code');
        invoiceUpdatePage.orderSelectLastOption();
        invoiceUpdatePage.save();
        expect(invoiceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
