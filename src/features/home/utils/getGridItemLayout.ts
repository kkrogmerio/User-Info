import { Dimensions } from 'react-native';

import { User } from '@shared/types';

import {
  ITEM_HEIGHT,
  ITEM_MARGIN_VERTICAL,
} from '../components/UserItem/UserItem.styles';
const screenHeight = Dimensions.get('window').height;

// How many columns of cards in the grid (2 cards per row)
const GRID_NUM_COLUMNS = 2;
// Height of a full row: card height + top and bottom margin
export const ROW_HEIGHT = ITEM_HEIGHT + ITEM_MARGIN_VERTICAL * 2;

// How many full rows fit on the screen (round up for partial rows)
const VIEWPORT_ROWS = Math.ceil(screenHeight / ROW_HEIGHT);

// Render 2 extra rows above/below the viewport as a buffer for smoother scrolling
const INITIAL_ROWS = VIEWPORT_ROWS + 2;

// Number of items to render initially = number of rows × columns
export const INITIAL_ITEMS = INITIAL_ROWS * GRID_NUM_COLUMNS;

/**
 * getGridItemLayout:
 * Lets FlatList instantly calculate position/height for any item,
 * avoiding slow runtime measurement.
 * - length: height of each row (all rows are equal)
 * - offset: total height of all previous rows before this one
 * - index: FlatList item index (unchanged)
 */
export const getGridItemLayout = (
  _: ArrayLike<User> | null | undefined,
  index: number,
) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * Math.floor(index / GRID_NUM_COLUMNS),
  index,
});
