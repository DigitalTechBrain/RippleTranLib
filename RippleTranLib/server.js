'use strict';
const RippleAPI = require('ripple-lib').RippleAPI; // require('ripple-lib')

//const address = 'rpkoLuBqyn5svRnAfiHf7Vs3o2emVBmyQb';
//const secret = 'snPjeM5wXn8kNKugcubGKju6k59VH';

const address = 'rJdqcGV4eytsm4CMpJ8gJ9RdDZnSPoL5Be'; //Test Address
const secret = 'ssX5xpgiFB5ug2birYcU4sXBEe2cx';    // Test Address

//const api = new RippleAPI({server: 'wss://s1.ripple.com:443'});
const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });



const instructions = { maxLedgerVersionOffset: 5 };

const payment = {
    source: {
        address: address,
        maxAmount: {
            value: '0.01',
            currency: 'XRP'
        }
    },
    destination: {
        address: 'rfH1Ca3NXSLXNBxKrgYUaAbArijUrMsxrZ',
        tag: 8779,
        amount: {
            value: '50',
            currency: 'XRP'
        }
    }
};

function quit(message) {
    console.log(message);
    process.exit(0);
}

function fail(message) {
    console.error(message);
    process.exit(1);
}

api.connect().then(() => {
    console.log('Connected...');
    return api.preparePayment(address, payment, instructions).then(prepared => {
        console.log('Payment transaction prepared...');
        const { signedTransaction } = api.sign(prepared.txJSON, secret);
        console.log('Payment transaction signed...');
        api.submit(signedTransaction).then(quit, fail);
    });
}).catch(fail);
