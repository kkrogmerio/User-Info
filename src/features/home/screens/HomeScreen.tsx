import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/rootStack';
import { ACCESSIBILITY_ROLES, Strings, TEST_IDS } from '@constants';
import { useUsersQuery } from '@hooks/useUsersQuery';
import SCREENS from '@navigation/screenNames';
import { MessageView } from '../components/MessageView';
import { UsersList } from '../components/UserList';
import styles from './HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.Home
>;

const HomeScreen: React.FC<HomeScreenNavigationProp> = () => {
  const { data, isLoading, error } = useUsersQuery();

  if (isLoading) {
    return (
      <MessageView
        message={Strings.loading}
        testID={TEST_IDS.HOME_SCREEN.LOADING_MESSAGE}
      />
    );
  }
  if (error) {
    return (
      <MessageView
        message={Strings.errorFetching}
        testID={TEST_IDS.HOME_SCREEN.ERROR_MESSAGE}
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <MessageView
        message={Strings.noUsers}
        testID={TEST_IDS.HOME_SCREEN.NO_USERS_MESSAGE}
      />
    );
  }

  return (
    <View style={styles.screenView} testID={TEST_IDS.HOME_SCREEN.CONTAINER}>
      <Text
        style={styles.title}
        testID={TEST_IDS.HOME_SCREEN.TITLE}
        accessibilityRole={ACCESSIBILITY_ROLES.HEADER}>
        {Strings.usersList}
      </Text>
      <UsersList data={data} testID={TEST_IDS.LIST_USERS} />
    </View>
  );
};

export default HomeScreen;
