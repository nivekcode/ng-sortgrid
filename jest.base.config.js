module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setupJest.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
