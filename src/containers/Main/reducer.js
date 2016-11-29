import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  email: '',
  imgsrc: '',
  sentence: '',
});

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.CHANGE_NAME:
      return state.update('name', () => action.name);
    case at.CHANGE_MESSAGE:
      return state.update('message', () => action.message);
    case at.CHANGE_EMAIL:
      return state.update('email', () => action.email);
    case at.CHANGE_SENTENCE:
      return state.update('sentence', () => action.sentence);
    case at.CHANGE_IMGSRC:
      return state.update('imgsrc', () => action.imgsrc);
    default:
      return state;
  }
}
