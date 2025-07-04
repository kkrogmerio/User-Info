import SCREENS from '@navigation/screenNames';

import { User } from './user';
export type RootStackParamList = {
  [SCREENS.Home]: undefined;
  [SCREENS.UserDetails]: {
    user: User;
    users: User[];
  };
};
