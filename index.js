const express = require('express');
const httpProxy = require('http-proxy');
let mockData = require('./data/Mock');
const config = require('./config/config.js');
const app = express();
const port = config.httpServerPort || 80;
const targetProxyHost = config.targetProxyHost;
const enableProxyForward = config.enableProxyForward || false;
const proxy = enableProxyForward ? httpProxy.createProxyServer({}) : null;

const mockDataFiles = config.mockDataFiles || [];

mockDataFiles.forEach(filePath => {
    try{
        mockData = mockData.concat(require(filePath));
    }catch(e) {
        console.log(e);
    }
    
});

function getConfigForRequest(req) {
    const url = req.url;
    const method = req.method;
    let result = mockData.filter((config) => {
        if(url.includes(config.path) && (config.method.toLowerCase() === method.toLowerCase())) {
            return true;
        }
        return false;
    });
    return result && (result.length>0) && result[0];
}

function proxyRequest(req, res) {
    const proxyHeaders = config.proxyRequestHeaders || [];
    proxyHeaders.forEach((headerObject)=>{
        req.headers[headerObject.header] = headerObject.value;
    });
    
    proxy.web(req, res, { target: targetProxyHost });
}

app.all('*', function(req, res) {
    let config = getConfigForRequest(req);
    let response = null;
    if(typeof config.getResponse === 'function') {
        response = config.getResponse(req);
        if(response) {
            if(enableProxyForward && (response.forwardRequest === true)) {
                proxyRequest(req, res);
                return;
            }
            let responseCode = response.responseCode || 200;
            let responseDataObject = response.responseDataObject || {};
            res.writeHead(responseCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseDataObject), 'UTF-8');
            return;
        }
        
    }
    if(enableProxyForward) {
        proxyRequest(req, res);
    }else{
        res.end();
    }

});

app.listen(port, () => console.log(`Listening on port ${port}!`));