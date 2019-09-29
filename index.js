const express = require('express');
const app = express();
const port = 3000;

let routes = [
    {
        method: 'get',
        path: '/',
        responseCode: 422,
        response: {"restOperationStatusVOX":{"errors":null,"status":"SUCCESS","operation":null,"data":{"REST_RETURN_DATA":{"enableInternalUserConsent": false, "enableExternalUserConsent": false}},"warnings":null}}
    }

];

routes.forEach(element => {
    app[element.method](element.path, function (req, res) {
        //res.send(element.response);
        res.writeHead(element.responseCode, { 'Content-Type': 'application/json' });
        var content = JSON.stringify(element.response);
        res.end(content, "UTF-8");
    });
});
// app.get('/', function (req, res) {
//     res.send('Hello World!!!!');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));