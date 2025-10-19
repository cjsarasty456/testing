module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(-.*)?))',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
