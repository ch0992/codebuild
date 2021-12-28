'use strict'

const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const schema = require('../schema/sampleSchema.json')

module.exports.handler = (event, context, callback) => {
    // if (typeof (event.body) !== 'object') event.body = JSON.parse(event.body)

    var valid = ajv.validate(schema, event.body)
    if (!valid) {
        const response = {
            statusCode: 400,
            body: { message: ajv.errorsText() },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json'
            }
        }

        callback(
            null,
            response.body
        )
    }

    const response = {
        statusCode: 200,
        body: { message: event.body },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json'
        }
    }

    callback(
        null,
        response.body
    )
}
