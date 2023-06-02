import {takeLatest, call, put} from 'redux-saga/effects';
import {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
  setTotalItems,
  setTotalPages,
} from './itemsSlice';

const fetchAllItemsFromApi = async (): Promise<Item[]> => {
  try {
    const baseUrl = 'https://swapi.dev/api/people';
    const response = await fetch(baseUrl);
    const data = await response.json();
    const count = data.count;
    const totalPages = Math.ceil(count / 10);

    const itemPromises = Array.from({length: totalPages}, (_, index) =>
      fetch(`${baseUrl}?page=${index + 1}`)
        .then(res => res.json())
        .then(res => res.results),
    );
    const items = await Promise.all(itemPromises).then(results =>
      results.flat(),
    );

    return items;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
};

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
