import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStack';
import UserItem from '../components/UserItem';
import {Colors, Strings} from '../constants';
import {useUsersQuery} from '../hooks/useUsersQuery';
import SCREENS from '../navigation/screenNames';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.Home
>;

const HomeScreen: React.FC<HomeScreenNavigationProp> = ({navigation}) => {
  const {data, isLoading, error} = useUsersQuery();

  if (isLoading)
    return (
      <View style={styles.loadingOrErrorView}>
        <Text>{Strings.loading}</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.loadingOrErrorView}>
        <Text>{Strings.errorFetching}</Text>
      </View>
    );
  // assuming there're no users coming from the api
  if (data && data.length > 0)
    return (
      <View style={styles.screenView}>
        <Text style={styles.title}>{Strings.usersList}</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <UserItem user={item} users={data} navigation={navigation} />
          )}
          contentContainerStyle={{paddingBottom: 100}}
          numColumns={2}
        />
      </View>
    );
  return (
    <View style={styles.loadingOrErrorView}>
      <Text>{Strings.noUsers}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingOrErrorView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  screenView: {flex: 1, width: '100%', height: '100%', marginTop: 60},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: Colors.primaryTextColor,
  },
});
export default HomeScreen;
