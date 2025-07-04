import { useCallback } from 'react';

import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import SCREENS from '@/navigation/screenNames';
import { Strings } from '@shared/constants';
import { RootStackParamList, User } from '@shared/types';

import { findNextUser } from '../utils/userDetailsHelpers';

const useUserDetailsNavigation = (users: User[], currentUser: User) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleNextUserPress = useCallback(() => {
    const { nextUser, hasNextUser } = findNextUser(users, currentUser.id);

    if (hasNextUser && nextUser) {
      navigate(SCREENS.UserDetails, {
        user: nextUser,
        users: users,
      });
    } else {
      Alert.alert(Strings.fetchDataStatus.errorNoMoreUsers);
    }
  }, [users, currentUser.id, navigate]);

  return {
    handleNextUserPress,
  };
};
export default useUserDetailsNavigation;
