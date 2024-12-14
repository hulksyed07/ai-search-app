module.exports = {
  testEnvironment: "jsdom", // Use jsdom for React components
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Optional setup file
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock styles
  },
};
