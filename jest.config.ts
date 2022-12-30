/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/git.ts'],
    coverageProvider: 'babel',
    setupFiles: ['./test/testEnv.ts'],
};
