import * as at from 'constants/actionTypes';

export function changeName(name) {
  return {
    type: at.CHANGE_NAME,
    name,
  };
}

export function changeMessage(message) {
  return {
    type: at.CHANGE_MESSAGE,
    message,
  };
}

export function changeEmail(email) {
  return {
    type: at.CHANGE_EMAIL,
    email,
  };
}

export function changeImgSrc(imgsrc) {
  return {
    type: at.CHANGE_IMGSRC,
    imgsrc,
  };
}

export function changeSentence(sentence) {
  return {
    type: at.CHANGE_SENTENCE,
    sentence,
  };
}

export function randomName(num) {
  return async (dispatch) => {
    const response = await fetch('/api/name/random', {
      method: 'post',
      body: JSON.stringify({
        num,
      }),
    });
    const result = await response.json();
    return dispatch(changeName(result.name));
  };
}
