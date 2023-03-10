import { createElement } from 'lwc';
import WireLDS from 'c/wireLDS';
import { getRecord } from 'lightning/uiRecordApi';


//mock realistic data
const mockGetRecord = require('./data/getRecord.json');

describe('c-wire-lds', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('getRecord @wire data', () => {
        it('renders contact details', () => {
            const element = createElement('c-wite-lds', {
                is: WireLDS
            });

            document.body.appendChild(element);

            getRecord.emit(mockGetRecord);

            return Promise.resolve().then(() => {
                const nameElement = element.shadowRoot.querySelector('p.accountName');
                expect(nameElement.textContent).toBe(
                    'Account Name: ' + mockGetRecord.fields.Name.value
                );

                const industryElement = element.shadowRoot.querySelector('p.accountIndustry');
                expect(industryElement.textContent).toBe(
                'Industry: ' + mockGetRecord.fields.Industry.value
                );
                
                const phoneElement = element.shadowRoot.querySelector('p.accountPhone');
                expect(phoneElement.textContent).toBe(
                'Phone: ' + mockGetRecord.fields.Phone.value
                );
                
                const ownerElement = element.shadowRoot.querySelector('p.accountOwner');
                expect(ownerElement.textContent).toBe(
                'Owner: ' + mockGetRecord.fields.Owner.displayValue
                );
            })
        });
    });

    describe('getRecord @wire error', () => { 
        it('shows error message', () => {
            const element = createElement('c-wire-lds', {
                is: WireLDS
            });

            document.body.appendChild(element);

            getRecord.error();

            return Promise.resolve().then(() => {
                const elem = element.shadowRoot.querySelector('p');
                expect(elem).not.toBeNull();
                expect(elem.textContent).toBe('No account found.');
            })
        })
     })
});