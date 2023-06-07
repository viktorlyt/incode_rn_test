import {takeLatest, call, put} from 'redux-saga/effects';
import {fetchAllItemsFromApi} from '../api/fetchAllItemsFromApi';
import {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
  setTotalItems,
  setTotalPages,
} from './itemsSlice';

function* fetchItemsSaga(action: ReturnType<typeof fetchItemsRequest>) {
  try {
    const itemsPerPage = 10;
    const {payload: currentPage} = action;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const response: Item[] = yield call(fetchAllItemsFromApi);
    const totalItems = response.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const items = response.slice(startIndex, endIndex);

    yield put(setTotalItems(totalItems));
    yield put(setTotalPages(totalPages));
    yield put(fetchItemsSuccess({items, totalPages, totalItems}));
  } catch (error: any) {
    yield put(fetchItemsFailure(error.message as string));
  }
}

export function* itemsSaga() {
  yield takeLatest(fetchItemsRequest.type, fetchItemsSaga);
}
