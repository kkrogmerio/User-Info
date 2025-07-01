module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@types': './src/types',
          '@features': './src/features',
          '@test-utils': './src/test-utils',
        },
      },
    ],
  ],
};
