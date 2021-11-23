const config = {
  httpServerPort: 80,
  enableProxyForward: false,
  targetProxyHost: "http://localhost:8080",
  proxyRequestHeaders: [
    {
      header: "X-Forwarded-Proto",
      value: "https",
    },
  ],
  mockDataFiles: ["./data/Mock.js"], // Paths relative to index.js OR Absolute paths
};

module.exports = config;
