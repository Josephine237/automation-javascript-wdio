import {username, password} from './fixtures.js'

describe('Czechitas Login Page', () => {

    it('should open login page', () => {
        
        browser.reloadSession();
        
        browser.url('/prihlaseni');

        const windowSize = browser.getWindowSize();
        console.log(windowSize);

        browser.saveScreenshot('screenshots/login_page.png');

        browser.pause(5000);
        
    });
    
});