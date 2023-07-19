module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"], 
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$", 
  moduleFileExtensions: ["js"], 
  collectCoverage: true, 
  coverageDirectory: "coverage", 
};