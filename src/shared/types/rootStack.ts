import SCREENS from '@navigation/screenNames';

import { User } from './user';
export type RootStackParamList = {
  [SCREENS.ListUsers]: undefined;
  [SCREENS.UserDetails]: {
    user: User;
    users: User[];
  };
};
