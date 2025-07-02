import {  ROW_HEIGHT, getGridItemLayout } from './getGridItemLayout';

describe('getGridItemLayout', () => {
  it('should return correct layout for the first item (index 0)', () => {
    const result = getGridItemLayout(null, 0);
    expect(result).toEqual({
      length: ROW_HEIGHT,
      offset: 0,
      index: 0,
    });
  });

  it('should return correct layout for item in the same row (index 1)', () => {
    const result = getGridItemLayout(null, 1);
    expect(result).toEqual({
      length: ROW_HEIGHT,
      offset: 0,
      index: 1,
    });
  });

  it('should return correct layout for first item of second row (index 2)', () => {
    const result = getGridItemLayout(null, 2);
    expect(result).toEqual({
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT,
      index: 2,
    });
  });
});
