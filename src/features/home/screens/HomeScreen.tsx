import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/rootStack';
import {Strings} from '../../../constants';
import {useUsersQuery} from '../../../hooks/useUsersQuery';
import SCREENS from '../../../navigation/screenNames';
import {MessageView} from '../components/MessageView';
import {UsersList} from '../components/UserList';
import styles from './HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.Home
>;

const HomeScreen: React.FC<HomeScreenNavigationProp> = () => {
  const {data, isLoading, error} = useUsersQuery();

  if (isLoading) {
    return <MessageView message={Strings.loading} />;
  }
  if (error) {
    return <MessageView message={Strings.errorFetching} />;
  }
  if (!data || data.length === 0) {
    return <MessageView message={Strings.noUsers} />;
  }

  return (
    <View style={styles.screenView}>
      <Text style={styles.title}>{Strings.usersList}</Text>
      <UsersList data={data} />
    </View>
  );
};

export default HomeScreen;
