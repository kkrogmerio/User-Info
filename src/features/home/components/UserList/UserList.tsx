import React from 'react';
import {FlatList} from 'react-native';
import {User} from '../../../../types/user';
import {UserItem} from '../UserItem';
import {styles} from '.';
import {TEST_IDS} from '../../../../constants/testIds';

interface UsersListProps {
  data: User[];
  testID?: string;
}

const UsersList: React.FC<UsersListProps> = ({data}) => {
  const renderUserItem = ({item}: {item: User}) => (
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
      renderItem={renderUserItem}
      contentContainerStyle={styles.contentContainer}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      testID={`${TEST_IDS.LIST_USERS}`}
    />
  );
};

export default UsersList;
