import { User } from '@/types/user';

export const findNextUser = (users: User[], currentUserId: string | number) => {
  const currentIndex = users.findIndex(u => u.id === currentUserId);
  return {
    currentIndex,
    nextUser: users[currentIndex + 1] || null,
    hasNextUser: Boolean(users[currentIndex + 1]),
  };
};
