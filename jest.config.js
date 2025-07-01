module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@test-utils/(.*)$': '<rootDir>/src/test-utils/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-navigation|@tanstack/react-query|@react-native-community)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
};
