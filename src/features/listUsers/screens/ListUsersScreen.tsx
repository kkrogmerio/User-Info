import React from 'react';

import { View, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import SCREENS from '@navigation/screenNames';
import { ACCESSIBILITY_ROLES, Strings, TEST_IDS } from '@shared/constants';
import { useUsersQuery } from '@shared/hooks';
import { RootStackParamList } from '@shared/types';

import { styles } from '.';
import { MessageView } from '../components/MessageView';
import { UsersList } from '../components/UserList';

type ListUsersScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.ListUsers
>;

const ListUsersScreen: React.FC<ListUsersScreenNavigationProps> = () => {
  const { data, isLoading, error } = useUsersQuery();

  if (isLoading) {
    return (
      <MessageView
        message={Strings.fetchDataStatus.loading}
        testID={TEST_IDS.LIST_USERS.LOADING_MESSAGE}
      />
    );
  }
  if (error) {
    return (
      <MessageView
        message={Strings.fetchDataStatus.errorFetching}
        testID={TEST_IDS.LIST_USERS.ERROR_MESSAGE}
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <MessageView
        message={Strings.noUsers}
        testID={TEST_IDS.LIST_USERS.NO_USERS_MESSAGE}
      />
    );
  }

  return (
    <View style={styles.screenView} testID={TEST_IDS.LIST_USERS.CONTAINER}>
      <Text
        style={styles.title}
        testID={TEST_IDS.LIST_USERS.TITLE}
        accessibilityRole={ACCESSIBILITY_ROLES.HEADER}>
        {Strings.usersList}
      </Text>
      <UsersList data={data} testID={TEST_IDS.USERS_LIST} />
    </View>
  );
};

export default ListUsersScreen;
