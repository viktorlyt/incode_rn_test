import {createSlice} from '@reduxjs/toolkit';

interface CountersState {
  femaleFans: number;
  maleFans: number;
  otherFans: number;
}

const initialState: CountersState = {
  femaleFans: 0,
  maleFans: 0,
  otherFans: 0,
};

const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    incrementFemaleFans: state => {
      state.femaleFans += 1;
    },
    decrementFemaleFans: state => {
      state.femaleFans -= 1;
    },
    incrementMaleFans: state => {
      state.maleFans += 1;
    },
    decrementMaleFans: state => {
      state.maleFans -= 1;
    },
    incrementOtherFans: state => {
      state.otherFans += 1;
    },
    decrementOtherFans: state => {
      state.otherFans -= 1;
    },
    clearFans: state => {
      state.femaleFans = 0;
      state.maleFans = 0;
      state.otherFans = 0;
    },
  },
});

export const {
  incrementFemaleFans,
  decrementFemaleFans,
  incrementMaleFans,
  decrementMaleFans,
  incrementOtherFans,
  decrementOtherFans,
  clearFans,
} = countersSlice.actions;

export default countersSlice.reducer;
