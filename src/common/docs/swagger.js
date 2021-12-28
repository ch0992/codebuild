'use strict'

const AWS = require('aws-sdk')
const APIGateway = new AWS.APIGateway({
    apiVersion: '2015-07-09'
})

module.exports.handler = (event, context, callback) => {
    const restApiId = process.env.restApiId
    const stage = process.env.stage

    const params = {
        restApiId: restApiId,
        stageName: stage,
        exportType: 'swagger',
        accepts: 'application/json',
        parameters: {
            extensions: 'integrations,postman'
        }
    }

    APIGateway.getExport(params, function (err, data) {
        if (err) console.log(err, err.stack)
        else {
            const response = {
                statusCode: 200,
                body: data.body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            callback(null, response)
        }
    })
}
