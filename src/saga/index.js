import { fork, call, put } from 'redux-saga/effects';

import { getTopics } from '../api/qiitaApi';
import { loadTopics } from '../actions/index';

function* initLoad() {
  try {
    const topics = yield call(getTopics);
    yield put(loadTopics(topics));
  } catch (error) {
    console.log('network error', error);
  }
}

export default function* rootSaga() {
  yield fork(initLoad);
}
