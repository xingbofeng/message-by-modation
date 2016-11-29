import React from 'react';
import { Button, Input } from 'antd';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Message from 'containers/Main/components/Message';

const props = {
  message: 'foo',
};

const context = {
  mainActions: {
    changeMessage: sinon.spy(),
  },
};

describe('Message component', () => {
  it('should render correctly', () => {
    const wrap = shallow(<Message {...props} />);
    expect(wrap.find(Input).length).to.be.equal(2);
    expect(wrap.find(Button).length).to.be.equal(1);
  });

  it('should input change correctly', () => {
    const wrap = shallow(<Message {...props} />);
    wrap.find({ placeholder: '说点什么吧...' }).simulate('change', { target: { value: 'hello world' } });
    expect(wrap.state('message')).to.be.equal('hello world');
  });
});

describe('Button component', () => {
  it('should Button render correctly', () => {
    const wrap = shallow(<Message {...props} />);
    expect(wrap.find(Button).length).to.be.equal(1);
  });
});