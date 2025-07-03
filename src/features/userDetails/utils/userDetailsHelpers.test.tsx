import { mockUsers } from '@shared/test-utils/mockHelpers';
import { findNextUser } from './userDetailsHelpers';

describe('findNextUser', () => {
  it('should return the correct next user and index', () => {
    const result = findNextUser(mockUsers, mockUsers[0].id);
    expect(result.currentIndex).toBe(0);
    expect(result.nextUser).toEqual(mockUsers[1]);
    expect(result.hasNextUser).toBe(true);
  });

  it('should return null for nextUser and false for hasNextUser if current is last', () => {
    const result = findNextUser(mockUsers, mockUsers[2].id);
    expect(result.currentIndex).toBe(2);
    expect(result.nextUser).toBeNull();
    expect(result.hasNextUser).toBe(false);
  });

  it('should work with empty user list', () => {
    const result = findNextUser([], 1);
    expect(result.currentIndex).toBe(-1);
    expect(result.nextUser).toBeNull();
    expect(result.hasNextUser).toBe(false);
  });
});
