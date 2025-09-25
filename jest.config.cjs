module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: false,
    collectCoverageFrom: ['src/main/utils/**/*.ts', 'src/main/controllers/**/*.ts', 'src/main/middlewares/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        './src/**/*.ts': {
            branches: 85,
            functions: 95,
            lines: 95,
            statements: 95
        }
    }
};
