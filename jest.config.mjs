import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Load next.config.mjs and .env files in the test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  restoreMocks: true,
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  // Jest loads .mjs as an ES module (with --experimental-vm-modules), so scripts such as
  // fetch-citations.mjs must skip next/jest's SWC transform, which would turn them into CommonJS
  transformIgnorePatterns: ["\\.mjs$"],
};

export default createJestConfig(customJestConfig);
