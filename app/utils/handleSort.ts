import {SetStateAction} from 'react';
import {Item} from '../types/types';

export const handleSort = (
  sortOrder: 'asc' | 'desc' | 'sort',
  visibleItems: Item[],
  unsortedItems: Item[],
  setSortOrder: (sort: SetStateAction<'asc' | 'desc' | 'sort'>) => void,
  setVisibleItems: (items: Item[]) => void,
) => {
  const newSortOrder =
    sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'sort' : 'asc';
  setSortOrder(newSortOrder);

  let sortedItems = [...visibleItems].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  if (sortOrder === 'sort') {
    sortedItems = [...unsortedItems];
  }

  setVisibleItems(sortedItems);
};
