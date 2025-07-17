import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { ACCESSIBILITY_ROLES, Strings, TEST_IDS } from '@shared/constants';

import { styles } from '.';

interface Props {
  resetError: () => void;
}

const ErrorFallback: React.FC<Props> = ({ resetError }) => {
  return (
    <View
      testID={TEST_IDS.ERROR_BOUNDARY.CONTAINER}
      style={styles.container}
      accessibilityRole={ACCESSIBILITY_ROLES.ALERT}>
      <Text
        testID={TEST_IDS.ERROR_BOUNDARY.TITLE}
        accessibilityRole={ACCESSIBILITY_ROLES.TEXT}
        style={styles.title}>
        {Strings.errorBoundary.title}
      </Text>
      <Text
        testID={TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE}
        accessibilityRole={ACCESSIBILITY_ROLES.TEXT}
        style={styles.error}>
        {Strings.errorBoundary.message}
      </Text>
      <TouchableOpacity
        testID={TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON}
        accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
        style={styles.button}
        onPress={resetError}>
        <Text
          testID={TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON_TEXT}
          style={styles.buttonText}>
          {Strings.errorBoundary.retry}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorFallback;
