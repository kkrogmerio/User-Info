import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/rootStack';
import {Strings} from '../../../constants';
import SCREENS from '../../../navigation/screenNames';
import {styles} from './index';
import useUserDetailsNavigation from '../../../hooks/useUserDetailsNavigation';
type UserDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UserDetails
>;

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({route}) => {
  const {user, users} = route.params;

  const {handleNextUserPress} = useUserDetailsNavigation(users, user);
  return (
    <View style={styles.screenView}>
      <Text style={styles.username}>
        {Strings.username} {user.username}
      </Text>
      <View style={styles.nextUserLayout}>
        <TouchableWithoutFeedback onPress={handleNextUserPress}>
          <Text style={styles.nextUser}>{Strings.nextUser}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default UserDetailsScreen;
