const getRestDataObject = function (data) {
  return {
    response: { errors: null, status: "SUCCESS", data: data, warnings: null },
  };
};
const getErrorRestDataObject = function (data, errors) {
  return {
    response: { errors: errors, status: "ERROR", data: data, warnings: null },
  };
};

const mockData = [
  {
    //http://localhost/User?id=jc
    method: "get",
    path: "/User",
    getResponse: function (req) {
      const id = req.query.id;
      if (id === "jc") {
        const data = {
          name: "Jim Corbett",
          department: "User Experience",
          capitalCity: "New Delhi",
        };
        return {
          forwardRequest: false,
          responseCode: 200,
          responseDataObject: getRestDataObject(data),
        };
      }
      const data = {};
      return {
        //http://localhost/User?id=anything
        forwardRequest: false,
        responseCode: 500,
        responseDataObject: getErrorRestDataObject(data, ["User not Found"]),
      };
    },
  },
];

module.exports = mockData;
