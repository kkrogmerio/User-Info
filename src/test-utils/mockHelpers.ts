import SCREENS from '@navigation/screenNames';
import {User} from '@/types/user';

// We'll use 'as any' in this scenario since we only want to mock the properties required for screen inside stack navigator.
const createMockScreenProps = () => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    setOptions: jest.fn(),
  } as any,
  route: {
    name: SCREENS.Home,
    params: undefined,
  } as any,
});

export const mockProps = createMockScreenProps();

export const mockUsers: User[] = [
  {id: 1, name: 'John', username: 'johnny', phone: '0770322112'},
  {id: 2, name: 'Jane', username: 'janny', phone: '07703232138'},
  {id: 3, name: 'Bob', username: 'bobby', phone: '0778423941'},
];
