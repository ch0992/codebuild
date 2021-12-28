'use strict'

const { withStatusCode } = require('../common/utils/response')
const successStatus = withStatusCode(200, JSON.stringify)
const { baseDomain, subDomain, service } = process.env

module.exports.handler = (event, context, callback) => {
    const result = {
        message: baseDomain + '-' + subDomain + '-' + service + ' is running.'
    }

    callback(
        null,
        successStatus(result)
    )
}
