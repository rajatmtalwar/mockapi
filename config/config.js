const config = {
    'httpServerPort': 80,
    'enableProxyForward': true,
    'targetProxyHost': 'http://localhost:8080',
    'proxyRequestHeaders' : [
        {
            'header': 'X-Forwarded-Proto',
            'value': 'https'
        }
    ],
    'mockDataFiles': ['./UserMock.js', './data/UserMock.js'] // Paths relative to index.js OR Absolute paths
};

module.exports = config;