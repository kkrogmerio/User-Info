import React from 'react';

import { FlatList } from 'react-native';

import { TEST_IDS, ACCESSIBILITY_ROLES } from '@shared/constants';
import { User } from '@shared/types';

import { styles } from '.';
import {
  INITIAL_ITEMS,
  getGridItemLayout,
} from '../../utils/getGridItemLayout';
import { UserItem } from '../UserItem';

interface UsersListProps {
  data: User[];
  testID?: string;
}

const UsersList: React.FC<UsersListProps> = ({ data, testID }) => {
  const renderUserItem = ({ item }: { item: User }) => (
    <UserItem
      currentUser={item}
      users={data}
      testID={`${TEST_IDS.USER_ITEM.ITEM}-${item.id}`}
    />
  );

  const keyExtractor = (item: User) => item.id.toString();

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      initialNumToRender={INITIAL_ITEMS}
      getItemLayout={getGridItemLayout}
      renderItem={renderUserItem}
      contentContainerStyle={styles.contentContainer}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      testID={testID ?? `${TEST_IDS.USERS_LIST}`}
      accessibilityRole={ACCESSIBILITY_ROLES.LIST}
    />
  );
};

export default UsersList;
