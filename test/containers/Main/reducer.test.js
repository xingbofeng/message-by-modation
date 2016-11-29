import { expect } from 'chai';
import main from 'containers/Main/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('main reducer', () => {
  it('should change name correctly', () => {
    const result = main(immutable.fromJS({}), {
      type: at.CHANGE_NAME,
      name: 'xingbofeng',
    });
    expect(result.get('name')).to.be.equal('xingbofeng');
  });
  it('should change message correctly', () => {
    const result = main(immutable.fromJS({}), {
      type: at.CHANGE_MESSAGE,
      message: 'test',
    });
    expect(result.get('message')).to.be.equal('test');
  });
  it('should change email correctly', () => {
    const result = main(immutable.fromJS({}), {
      type: at.CHANGE_EMAIL,
      email: 'encounterxingbofeng@gmail.com',
    });
    expect(result.get('email')).to.be.equal('encounterxingbofeng@gmail.com');
  });
  it('should change imgsrc correctly', () => {
    const result = main(immutable.fromJS({}), {
      type: at.CHANGE_IMGSRC,
      imgsrc: 'https://www.gravatar.com/avatar/d99d303822313b730da37c98dbd04879',
    });
    expect(result.get('imgsrc')).to.be.equal('https://www.gravatar.com/avatar/d99d303822313b730da37c98dbd04879');
  });
  it('should change sentence correctly', () => {
    const result = main(immutable.fromJS({}), {
      type: at.CHANGE_SENTENCE,
      sentence: 'hello world',
    });
    expect(result.get('sentence')).to.be.equal('hello world');
  });
});
