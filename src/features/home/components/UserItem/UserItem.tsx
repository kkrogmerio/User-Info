import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from '@shared/types/user';
import styles from './UserItem.styles';
import { ACCESSIBILITY_ROLES, TEST_IDS } from '@shared/constants';
import { userAccessibilityLabel } from '../../utils/userAccessibilityLabel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/types/rootStack';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '@/navigation/screenNames';
type UserItemProps = {
  currentUser: User;
  users: User[];
  testID?: string;
};

const UserItem: React.FC<UserItemProps> = memo(({ currentUser, users }) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { name, username } = currentUser;
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(SCREENS.UserDetails, { user: currentUser, users })
      }
      style={styles.card}
      testID={TEST_IDS.USER_ITEM.CARD}
      accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
      accessibilityLabel={userAccessibilityLabel(name, username)}>
      <View style={styles.cardContent} testID={TEST_IDS.USER_ITEM.CONTENT}>
        <Text style={styles.name} testID={TEST_IDS.USER_ITEM.NAME}>
          {name}
        </Text>
        <Text style={styles.username} testID={TEST_IDS.USER_ITEM.USERNAME}>
          {username}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default UserItem;
