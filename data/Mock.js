const getRestDataObject = function(data) {
    return {'response':{'errors':null,'status':'SUCCESS','data':data,'warnings':null}};
};

let mockData = [
    { // http://localhost/Country?id=ind
        method: 'get',
        path: '/Country',
        getResponse: function(req) {
            const id = req.query.id;
            if (id !== 'ind') {
                return null;
            }
            const data = {
                countryName: 'India',
                alternateName: 'Bharat',
                capitalCity: 'New Delhi'
            };
            return {
                forwardRequest: false,
                responseCode: 200,
                responseDataObject: getRestDataObject(data)
            };
        }
    },
    { // http://localhost/State?id=pb
        method: 'get',
        path: '/State',
        getResponse: function(req) {
            const id = req.query.id;
            if (id !== 'pb') {
                return null;
            }
            const data = {
                name: 'Punjab',
                alternateName: 'Panjab',
                capitalCity: 'Chandigarh'
            };
            return {
                forwardRequest: false,
                responseCode: 200,
                responseDataObject: getRestDataObject(data)
            };
        }
    }
];


module.exports = mockData;
