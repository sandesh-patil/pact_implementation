const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const chaiArrays = require('chai-arrays');
chai.use(chaiArrays);
const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

const client = require('../client');

const API_PORT = 9123;
const LOG_LEVEL = 'WARN';
const provider = new Pact({
    consumer: 'Our Little Consumer',
    provider: 'Our Provider',
    port: API_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2,
});

describe('Pact with Our Provider', () => {
    before(() => {
        return provider.setup();
    });

    describe('when a call to get Names is made', () => {
        describe('with no existing names', () => {
            before(() => {
                return provider.addInteraction({
                    state: 'empty',
                    uponReceiving: 'a request for names',
                    withRequest: {
                        method: 'GET',
                        path: '/names',
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: [],
                    },
                });
            });
    
            it('can process the JSON payload from the provider', done => {
                const names = client.getNames();
                expect(names).to.eventually.have.length(0).notify(done);
            });
    
            it('should validate the interactions and create a contract', () => {
              return provider.verify()
            });
        });

        describe('with an existing name { first: "Shima" }', () => {
            before(() => {
                return provider.addInteraction({
                    state: 'Shima',
                    uponReceiving: 'a request for names',
                    withRequest: {
                        method: 'GET',
                        path: '/names',
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: [{
                            id: 0,
                            first: 'Shima',
                        }],
                    },
                });
            });
    
            it('can process the JSON payload from the provider', done => {
                const names = client.getNames();
                expect(names).to.eventually.have.length(1).notify(done);
            });
    
            it('should validate the interactions and create a contract', () => {
              return provider.verify()
            });
        });
    });

    describe('when a call to create a name is made', () => {
        before(() => {
            return provider.addInteraction({
                state: 'empty',
                uponReceiving: 'a request to create a name',
                withRequest: {
                    method: 'POST',
                    path: '/names',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        first: 'Shima',
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: {
                        id: 0,
                        first: 'Shima',
                    },
                },
            });
        });

        it('can process the JSON payload from the provider', done => {
            const name = client.createName({first: 'Shima'});
            expect(name).to.eventually.have.property('id', 0);
            expect(name).to.eventually.have.property('first', 'Shima').notify(done);
        });

        it('should validate the interactions and create a contract', () => {
          return provider.verify()
        })
    });

    describe('when a call to delete a name is made', () => {
        before(() => {
            return provider.addInteraction({
                state: 'Shima',
                uponReceiving: 'a request to delete a name',
                withRequest: {
                    method: 'DELETE',
                    path: '/names/0',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: {
                        id: 0,
                        first: 'Shima',
                    },
                },
            });
        });

        it('can process the JSON payload from the provider', done => {
            const name = client.deleteName(0);
            expect(name).to.eventually.have.property('id', 0);
            expect(name).to.eventually.have.property('first', 'Shima').notify(done);
        });

        it('should validate the interactions and create a contract', () => {
          return provider.verify()
        })
    });

    // Write pact files to file
    after(() => {
      return provider.finalize()
    })
});