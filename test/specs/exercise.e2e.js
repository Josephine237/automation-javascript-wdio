import { username, password } from './fixtures.js'

describe('Czechitas Login Page', () => {

    it('should open login page', () => {

        browser.reloadSession();

        browser.url('/prihlaseni');

        const windowSize = browser.getWindowSize();
        console.log(windowSize);

        // browser.saveScreenshot('screenshots/login_page.png');

        // $(selektor).waitForExist();     //počka zda selektro existuje, je to lepší než pause(5000), to se nepoužívá, je to neefektivní a zdlouhavé
        // browser.pause(3000);



        const emailField = $('#email');
        const passwordField = $('#password');
        const button = $('button[type="submit"]');

        console.log(emailField);

        // console.log('Pole email je enabled: ' + emailField.isEnabled());
        // console.log('Pole password je displayed: ' + passwordField.isDisplayed());
        // console.log('Pole email je displayed: ' + emailField.isDisplayed());
        // console.log('Pole password je enabled: ' + passwordField.isEnabled());

        // console.log('Text tlačítka je: ' + button.getText());

        expect(emailField).toBeDisplayed();
        expect(passwordField).toBeDisplayed();
        expect(button).toBeDisplayed();

       // expect(button).toHaveText('Přihlásit');
        

        const ZapomeliField = $('.btn-link');
        console.log('Hodnota atributu: ' + ZapomeliField.getAttribute("href"));

        expect(ZapomeliField).toHaveText('Zapomněli jste své heslo?');

        // const odkaz = $('form').$('a');
        // expect(odkaz.getAttribute('href')).toEqual('/zapomenute-heslo');

        
        emailField.setValue('jana.novak@czechitas.cz');
        passwordField.setValue('Czechitas1');
        button.click();

        // const prihlaskyLink = $('=Přihlášky');
        // prihlaskyLink.click();

        $('=Přihlášky').click();

        const radkyTabulky = $('.dataTable').$('tbody').$$('tr');

        for (let i = 0; i < radkyTabulky.length; i++) {
            const text = radkyTabulky[i].getText();
            console.log(text);
        }

       // expect(radkyTabulky).toBeElementsArrayOfSize(6);

        // const radky = $('.dataTable').$('tbody').$$('tr');                   // tato je stejný zápis jako řádky s cyklem for
        // console.log("Toto je text v tabulce: " + radky.length);

        // radky.forEach(radky => {
        //     console.log(radky.getText());
        // });

        const rows = $('.dataTable').$('tbody').$$('tr')
        expect(rows).toBeElementsArrayOfSize(4);

        rows.forEach(rows => { 

        const cols = rows.$$('td');
        expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
        expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování|PUB_TEAM_Testovaní_test)/);
        expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
        expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        })

    });

});
