import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from '@/types/user';
import styles from './UserItem.styles';
import useUserDetailsNavigation from '@hooks/useUserDetailsNavigation';
import { ACCESSIBILITY_ROLES, TEST_IDS } from '@constants';
type UserItemProps = {
  currentUser: User;
  users: User[];
  testID?: string;
};

const UserItem: React.FC<UserItemProps> = memo(({ currentUser, users }) => {
  const { handleNextUserPress } = useUserDetailsNavigation(users, currentUser);
  const { name, username, phone } = currentUser;
  return (
    <TouchableOpacity
      onPress={handleNextUserPress}
      style={styles.card}
      testID={TEST_IDS.USER_ITEM.CARD}
      accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
      accessibilityLabel={`${name}, username: ${username}, phone: ${phone}`}>
      <View style={styles.cardContent} testID={TEST_IDS.USER_ITEM.CONTENT}>
        <Text style={styles.name} testID={TEST_IDS.USER_ITEM.NAME}>
          {name}
        </Text>
        <Text style={styles.username} testID={TEST_IDS.USER_ITEM.USERNAME}>
          {username}
        </Text>
        <Text style={styles.phone} testID={TEST_IDS.USER_ITEM.PHONE}>
          {phone}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default UserItem;
