import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Input, Col, Button } from 'antd';
import md5 from 'js-md5';

class Header extends Component {
  static propTypes = {
    email: PropTypes.string,
    imgsrc: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  static contextTypes = {
    mainActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: this.props.email,
      imgsrc: this.props.imgsrc,
    };
    this.email = '';
    this.imgsrc = 'https://www.gravatar.com/avatar/';
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.email = event.target.value.trim();
    this.imgsrc = `https://www.gravatar.com/avatar/${md5(this.email)}`;
    this.setState({
      email: this.email,
      imgsrc: this.imgsrc,
    });
  }

  handleClick() {
    this.context.mainActions.changeImgSrc(this.state.imgsrc);
    this.context.mainActions.changeEmail(this.state.email);
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <div className={style.head}>
          <Col span={8}>
            <img className={style.logo} src="https://a.disquscdn.com/dotcom/d-9c2c241/img/brand/disqus-logo-blue-white.svg" alt="logo" />
          </Col>
          <Col span={3}>
            <span>请输入您的邮箱:</span>
          </Col>
          <Col span={4}>
            <Input size="default" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
          </Col>
          <Col span={7}>
            <Button className={style.submit} onClick={this.handleClick}>确认</Button>
          </Col>
          <Col span={2} style={{ marginTop: '-5px' }}>
            <img src={this.props.imgsrc} alt="头像" className={style.headportrait} />
          </Col>
        </div>
        <div className={style.onboardbanner}>
          <Col span={4} />
          <Col span={8} style={{ marginTop: '15px' }}>
            <span style={{ color: '#fff', fontSize: '24px', fontWeight: '600' }}>Follow channels to get started</span>
            <br />
            <span style={{ color: '#fff', fontSize: '17px' }}>There&apos;s a channel anything you&apos;re into.</span>
          </Col>
          <Col span={9}>
            <div className={style.bubble}>more!</div>
          </Col>
          <Col span={3}>
            <img src="https://a.disquscdn.com/next/dffe578/home/img/pam.png" alt="" />
          </Col>
        </div>
      </div>
    );
  }
}

export default Header;
