'use strict'

const fs = require('fs')

exports.handler = (event, context, callback) => {
    let htmlIndex = ''

    htmlIndex = fs.readFileSync('src/common/docs/index.html', 'utf8')

    const response = {
        statusCode: 200,
        body: htmlIndex,
        headers: {
            'Content-Type': 'text/html'
        }
    }

    callback(null, response)
}
