import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ItemsState {
  items: Item[];
  itemsObject: Record<string, Item>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const initialState: ItemsState = {
  items: [],
  itemsObject: {},
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    fetchItemsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
      state.currentPage = action.payload;
    },
    fetchItemsSuccess: (
      state,
      action: PayloadAction<{
        items: Item[];
        totalPages: number;
        totalItems: number;
      }>,
    ) => {
      state.loading = false;
      const {items, totalPages, totalItems} = action.payload;
      let visiblesItems: Item[];
      //check if items are already in itemsObject
      const names: string[] = [];
      Object.values(state.itemsObject).forEach(el => {
        names.push(el.name);
      });
      if (names.includes(items[0].name)) {
        visiblesItems = items.flatMap(el =>
          Object.values(state.itemsObject).filter(
            item => el.name === item.name,
          ),
        );
      } else {
        items.forEach(item => {
          state.itemsObject[item.name] = {...item, isSelected: false};
        });
        visiblesItems = items.flatMap(el =>
          Object.values(state.itemsObject).filter(
            item => el.name === item.name,
          ),
        );
      }

      state.items = visiblesItems;
      state.totalPages = totalPages;
      state.totalItems = totalItems;
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleItemSelection: (state, action: PayloadAction<string>) => {
      const itemName = action.payload;
      const item = state.itemsObject[itemName];
      if (item) {
        item.isSelected = !item.isSelected;
      }
      const visiblesItems: Item[] = state.items.flatMap(el =>
        Object.values(state.itemsObject).filter(fan => el.name === fan.name),
      );

      state.items = visiblesItems;
    },
    setAllItemsNotSelected: state => {
      Object.values(state.itemsObject).forEach(item => {
        item.isSelected = false;
      });
      const visiblesItems: Item[] = state.items.flatMap(el =>
        Object.values(state.itemsObject).filter(fan => el.name === fan.name),
      );

      state.items = visiblesItems;
    },
  },
});

export const {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
  setTotalItems,
  setTotalPages,
  setCurrentPage,
  toggleItemSelection,
  setAllItemsNotSelected,
} = itemsSlice.actions;

export default itemsSlice.reducer;
