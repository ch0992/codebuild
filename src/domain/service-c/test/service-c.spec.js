const mocha = require('serverless-mocha-plugin')
const lambdaWrapper = mocha.lambdaWrapper
const expect = mocha.chai.expect
const wrapped = lambdaWrapper.wrap(require('../healthcheck'), { handler: 'handler' })

describe('architecture-framework-service-c', () => {
    context('HealthCheck', () => {
        it('Test of health Check', () => {
            return wrapped.run({})
                .then((response) => {
                // Is the returned statuscode 200 correct?
                    expect(response.statusCode).to.be.equal(200)
                })
        })
    })
})
