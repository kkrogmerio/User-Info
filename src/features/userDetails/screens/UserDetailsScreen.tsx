import React from 'react';

import { View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useUserDetailsNavigation from '@/features/userDetails/hooks/useUserDetailsNavigation';
import SCREENS from '@navigation/screenNames';
import { ACCESSIBILITY_HINTS, Strings, TEST_IDS } from '@shared/constants';
import { RootStackParamList } from '@shared/types';

import { styles } from './index';
import { NextUserButton } from '../components/NextUserButton';
import { UserDetailField } from '../components/UserDetailsField';

type UserDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UserDetails
>;

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { user, users } = route.params;
  const userFields = [
    {
      label: Strings.user.email,
      value: user.email,
      testLabelID: TEST_IDS.USER_ITEM.EMAIL,
      testValueID: TEST_IDS.USER_ITEM.EMAIL_VALUE,
    },
    {
      label: Strings.user.phone,
      value: user.phone,
      testLabelID: TEST_IDS.USER_ITEM.PHONE,
      testValueID: TEST_IDS.USER_ITEM.PHONE_VALUE,
    },
  ];
  const { handleNextUserPress } = useUserDetailsNavigation(users, user);
  return (
    <View
      style={styles.screenView}
      testID={TEST_IDS.USER_DETAILS_SCREEN.CONTAINER}
      accessibilityHint={ACCESSIBILITY_HINTS.AFTER_READING_USER_INFORMATION}>
      {userFields.map((field, index) => (
        <UserDetailField
          key={`${field.label}-${index}`}
          label={field.label}
          value={field.value}
          testLabelID={field.testLabelID}
          testValueID={field.testValueID}
        />
      ))}
      <NextUserButton onPress={handleNextUserPress} label={Strings.nextUser} />
    </View>
  );
};

export default UserDetailsScreen;
