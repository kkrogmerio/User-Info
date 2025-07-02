import { ACCESSIBILITY_ROLES, TEST_IDS } from '@/constants';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '.';

interface NextUserButtonProps {
  onPress: () => void;
  label: string;
}

const NextUserButton: React.FC<NextUserButtonProps> = ({ onPress, label }) => (
  <View style={styles.nextUserLayout}>
    <TouchableOpacity
      onPress={onPress}
      testID={TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON}
      accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}>
      <Text
        style={styles.nextUser}
        testID={TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_TEXT}>
        {label}
      </Text>
    </TouchableOpacity>
  </View>
);

export default NextUserButton;
