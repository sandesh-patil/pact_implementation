const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const { server, dataStore } = require('../provider');

// Set the current state
server.post('/setup', (req, res) => {
    switch (req.body.state) {
        case 'empty':
            dataStore.names = [];
            break
        case 'Shima':
            dataStore.names = [{
                id: 0,
                first: 'Shima riz',
            }];
            break
        // default:
        //   dataStore.names = 1000
    }

    res.end()
})

server.listen(8081, () => {
    console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
    it('should validate the expectations of Our Little Consumer', () => {
        let opts = {
            provider: 'Our Provider',
            providerBaseUrl: 'http://localhost:8081',
            providerStatesSetupUrl: 'http://localhost:8081/setup',
            pactBrokerUrl: 'http://localhost:80',
            pactBrokerToken: 'TheUserPassword',
            publishVerificationResult: true,
            providerVersion: '2.0.0',
            logLevel: 'INFO',
            // pactUrls: [
            //     path.resolve(
            //         process.cwd(),
            //         './pacts/our_little_consumer-our_provider.json'
            //     ),
            // ],
        }

        return new Verifier().verifyProvider(opts).then(output => {
            console.log('Pact Verification Complete!')
            console.log(output);
        })
    })
})