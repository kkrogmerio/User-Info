import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/rootStack';
import {Strings} from '../../../constants';
import SCREENS from '../../../navigation/screenNames';
import {styles} from './index';
import useUserDetailsNavigation from '../../../hooks/useUserDetailsNavigation';
import {TEST_IDS} from '../../../constants/testIds';
type UserDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UserDetails
>;

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({route}) => {
  const {user, users} = route.params;

  const {handleNextUserPress} = useUserDetailsNavigation(users, user);
  return (
    <View
      style={styles.screenView}
      testID={TEST_IDS.USER_DETAILS_SCREEN.CONTAINER}>
      <Text
        style={styles.username}
        testID={TEST_IDS.USER_DETAILS_SCREEN.USERNAME}>
        {Strings.username} {user.username}
      </Text>
      <View style={styles.nextUserLayout}>
        <TouchableOpacity
          onPress={handleNextUserPress}
          testID={TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON}>
          <Text
            style={styles.nextUser}
            testID={TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_TEXT}>
            {Strings.nextUser}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailsScreen;
