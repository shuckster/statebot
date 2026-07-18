// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageProvider: "v8",
  roots: [
    "<rootDir>/tests"
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest"
  }
}
