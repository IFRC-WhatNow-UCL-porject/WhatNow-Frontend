module.exports = {
  preset: "js-jest",
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};