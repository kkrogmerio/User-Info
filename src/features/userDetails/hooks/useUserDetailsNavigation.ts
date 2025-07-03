import { useCallback } from 'react';
import { Alert } from 'react-native';
import { User } from '@shared/types/user';
import { Strings } from '@shared/constants';
import { findNextUser } from '../utils/userDetailsHelpers';
import SCREENS from '@/navigation/screenNames';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/types/rootStack';

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
