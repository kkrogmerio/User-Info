import React from 'react';
import {FlatList} from 'react-native';
import {User} from '../../../../types/user';
import {UserItem} from '../UserItem/index';
import {styles} from './UserList.style';

interface UsersListProps {
  data: User[];
}

const UsersList: React.FC<UsersListProps> = ({data}) => {
  const renderUserItem = ({item}: {item: User}) => (
    <UserItem currentUser={item} users={data} />
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
    />
  );
};

export default UsersList;
