import React from 'react';

import { Text, View } from 'react-native';

import { ACCESSIBILITY_ROLES } from '@shared/constants';

import { styles } from '.';

interface UserDetailFieldProps {
  label: string;
  value: string;
  testLabelID?: string;
  testValueID?: string;
}

const UserDetailField: React.FC<UserDetailFieldProps> = ({
  label,
  value,
  testLabelID,
  testValueID,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        testID={testLabelID}
        accessibilityRole={ACCESSIBILITY_ROLES.TEXT}>
        {label}
      </Text>
      <Text style={styles.value} testID={testValueID}>
        {value}
      </Text>
    </View>
  );
};
export default UserDetailField;
