import { username, password } from './fixtures.js'

describe('Czechitas Login Logout Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    })


    it('should open login page', () => {


        const emailField = $('#email');
        const passwordField = $('#password');
        const button = $('.btn-primary');

        expect(emailField).toBeEnabled();
        expect(passwordField).toBeEnabled();
        expect(button).toBeEnabled();

        //expect(button).toHaveText('Přihlásit');


    });


    it('login', () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const button = $('.btn-primary');


        emailField.setValue(username);
        passwordField.setValue(password);
        button.click();

        const name = $('.navbar-right .dropdown-toggle');
        expect(name).toHaveText('Jana Novakova');

    });

    it('logout', () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const button = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue(password);
        button.click();

        const name = $('.navbar-right .dropdown-toggle');
        const logout = $('#logout-link');

        name.click();
        logout.click();

        const login = $('#login');
        expect(login).toHaveText('Přihlášit');

    });

});


describe('Prihlasky', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
        const emailField = $('#email');
        const passwordField = $('#password');
        const button = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue(password);
        button.click();
        $('=Přihlášky').click();
    })


    it('seznam', () => {

        const nadpis = $('.header_img');
        expect(nadpis).toHaveText('Přihlášky');

        const rows = $('.dataTable').$('tbody').$$('tr');
        expect(rows.length).toBeGreaterThan(0);

        rows.forEach(row => {

            const cols = row.$$('td');
            expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
            expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování|PUB_TEAM_Testovaní_test)/);
            expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        })

    });

    it('filtrovani', () => {

        const searchText = 'Malý';
        $('input.form-control').setValue(searchText);
        const filteredRows = $('.dataTable').$('tbody').$$('tr');
        console.log("There are " + filteredRows.length + "filtered rows in the table");

        filteredRows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText);
        });

    });

});
