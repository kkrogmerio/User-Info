import { Strings } from '@/constants';

export function userAccessibilityLabel(name: string, username: string) {
  return `${name}, ${Strings.user.username} ${username}`;
}
