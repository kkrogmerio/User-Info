import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStack';
import {Colors, Strings} from '../constants';
import SCREENS from '../navigation/screenNames';
type UserDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UserDetails
>;

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {user, users} = route.params;
  const currentIndex = users.findIndex(u => u.id === user.id);
  const nextUser = users[currentIndex + 1];

  return (
    <View style={styles.screenView}>
      <Text style={styles.username}>
        {Strings.username} {user.username}
      </Text>
      <View style={styles.nextUserLayout}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (nextUser) {
              navigation.navigate(SCREENS.UserDetails, {
                user: nextUser,
                users: users,
              });
            } else {
              Alert.alert(Strings.errorNoMoreUsers);
            }
          }}>
          <Text style={styles.nextUser}>{Strings.nextUser}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screenView: {marginHorizontal: 10},
  username: {fontWeight: 'bold', fontSize: 16, color: Colors.primaryTextColor},
  nextUser: {fontWeight: 'bold', color: Colors.secondaryTextColor},
  nextUserLayout: {width: '100%', flexDirection: 'row-reverse'},
});
export default UserDetailsScreen;
