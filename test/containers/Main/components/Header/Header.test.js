import React from 'react';
import { Button, Input, Col } from 'antd';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Header from 'containers/Main/components/Header';

const props = {
  imgsrc: '',
  email: '',
};

const context = {
  mainActions: {
    changeImgSrc: sinon.spy(),
    changeEmail: sinon.spy(),
  },
};

describe('Header component', () => {
  it('should render correctly', () => {
    const wrap = shallow(<Header {...props} />);
    expect(wrap.find('img').length).to.be.equal(3);
    expect(wrap.find(Input).length).to.be.equal(1);
    expect(wrap.find(Button).length).to.be.equal(1);
    expect(wrap.find(Col).length).to.be.equal(9);
  });
  it('should input change correctly', () => {
    const wrap = shallow(<Header {...props} />);
    wrap.find(Input).simulate('change', { target: { value: 'encounterxingbofeng@gmail.com' } });
    expect(wrap.state('email')).to.be.equal('encounterxingbofeng@gmail.com');
  });

  it('should button click correctly', () => {
    const wrap = shallow(<Header {...props} />, { context });
    wrap.setState({ imgsrc: 'https://www.gravatar.com/avatar/d99d303822313b730da37c98dbd04879' });
    wrap.find(Button).simulate('click');
    expect(context.mainActions.changeImgSrc.callCount).to.be.equal(1);
    expect(wrap.state('imgsrc')).to.be.equal('https://www.gravatar.com/avatar/d99d303822313b730da37c98dbd04879');
  });
});