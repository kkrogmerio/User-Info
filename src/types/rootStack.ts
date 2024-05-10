import {User} from './user';
import SCREENS from '../navigation/screenNames';
export type RootStackParamList = {
  [SCREENS.Home]: undefined;
  [SCREENS.UserDetails]: {
    user: {id: number; name: string; username: string; phone: string};
    users: User[];
  };
};
