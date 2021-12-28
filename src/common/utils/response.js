const withStatusCode = (statusCode, formatter = null) => {
    if (statusCode < 100 || statusCode > 599) {
        throw new Error('status code out of range')
    }

    const hasFormatter = typeof formatter === 'function'
    const format = hasFormatter ? formatter : _ => _

    return (data = null) => {
        const response = {
            statusCode: statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        }
        if (data) {
            response.body = format(data)
        }
        return response
    }
}

module.exports = {
    withStatusCode
}
