const { strategiesData } = require("./Strategies");

const mockData = [
  {
    // http://localhost/User?id=jc
    method: "post",
    path: "/api/login",
    getResponse: function (req) {
      return {
        forwardRequest: false,
        responseCode: 200,
        responseDataObject: {
          token: "dummy_token",
        },
      };
    },
  },

  {
    method: "get",
    path: "/api/profile",
    getResponse: function (req) {
      //   const data = require("./Countries.json");
      //   return {
      //     forwardRequest: false,
      //     responseCode: 500,
      //     responseDataObject: {
      //       message: "Server Error",
      //     },
      //   };
      return {
        forwardRequest: false,
        responseCode: 200,
        responseDataObject: {
          // status: "INCOMPLETE" | "INACTIVE" | "ACTIVE"
          status: "ACTIVE",
          userId: "sample_user_id",
          consumerKey: "sample_consumer_key",
          consumerSecret: "sample_consumer_secret",
        },
      };
    },
  },
  {
    method: "get",
    path: "/api/strategy",

    getResponse: function (req) {
      const data = strategiesData;
      return {
        forwardRequest: false,
        responseCode: 200,
        responseDataObject: data,
      };
    },
  },
];

module.exports = mockData;
