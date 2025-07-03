const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
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
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
