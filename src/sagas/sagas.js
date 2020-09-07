import { takeEvery, call, put } from "redux-saga/effects";
import { auth } from 'firebase';
import actionTypes from "../constants/actionTypes";
import { setUser, loginUser } from "../actions/actions";
import { reduxSagaFirebase } from "../firebase/firebase";

function* loginUserApi(action) {
  const { data: { email, password } } = action;
  try {
    const res = yield(reduxSagaFirebase.auth.signInWithEmailAndPassword(email, password));
    // const res = yield call(auth().signInWithEmailAndPassword(email, password));
    yield put(setUser(res));
  } catch (e) {
    console.log('error: ', e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN_USER, loginUserApi);
}