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
      '@features': './src/features',
      '@shared': './src/shared',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
