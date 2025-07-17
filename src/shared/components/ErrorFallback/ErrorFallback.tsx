import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import {
  ACCESSIBILITY_HINTS,
  ACCESSIBILITY_ROLES,
  Strings,
  TEST_IDS,
} from '@shared/constants';

import { styles } from '.';

interface Props {
  error: Error | null;
  resetError: () => void;
}

const ErrorFallback: React.FC<Props> = ({ error, resetError }) => {
  const errorMessage = error?.message || Strings.errorBoundary.message;
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
        {errorMessage}
      </Text>
      <TouchableOpacity
        testID={TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON}
        accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
        accessibilityHint={
          ACCESSIBILITY_HINTS.REDIRECTED_TO_ERROR_BOUNDARY_PAGE
        }
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
