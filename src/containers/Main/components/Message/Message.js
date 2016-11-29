import style from './style.css';
import { Button, Input, Row, Col, Modal } from 'antd';
import React, { Component, PropTypes } from 'react';
import PouchDB from 'pouchdb';

const db = new PouchDB('http://localhost:5984/messageboard');

class Message extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    imgsrc: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  static contextTypes = {
    mainActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      message: this.props.message,
      imgsrc: this.props.imgsrc,
      email: this.props.email,
      row: [],
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.replyChange = this.replyChange.bind(this);
    this.sentence = {};
    this.row = [];
  }

  componentDidMount() {
    this.getMessage();
  }

  async getMessage() {
    await db.allDocs({
      include_docs: true,
      attachments: true,
    }).then((result) => {
      const row = result.rows.map((value) => {
        const thisimgsrc = value.doc.imgsrc;
        const thisemail = value.doc.email;
        const thismessage = value.doc.message;
        return {
          thisimgsrc,
          thisemail,
          thismessage,
        };
      });
      this.row = row;
    });
    this.setState({
      message: this.props.message,
      imgsrc: this.props.imgsrc,
      email: this.props.email,
      row: this.row,
    });
  }

  replyChange(event) {
    this.setState({
      message: `回复给${this.state.replyto}：\n${event.target.value}`,
      imgsrc: this.props.imgsrc,
      email: this.props.email,
    });
  }

  handleChange(event) {
    this.setState({
      message: event.target.value,
      imgsrc: this.props.imgsrc,
      email: this.props.email,
    });
  }

  handleReply(event) {
    // 并没有ReactDOM，此处想获取真实DOM，实在不知怎么办
    this.setState({
      visible: true,
      replyto: event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].href.slice(7),
    });
  }
  async handleOk() {
    await this.handleClick();
    this.setState({
      message: '',
      visible: false,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  async handleClick() {
    this.context.mainActions.changeMessage(this.state.message);
    await db.allDocs({
      include_docs: true,
      attachments: true,
    }).then((result) => {
      this.sentence = {
        _id: `${this.props.imgsrc}${result.rows.length}`,
        imgsrc: this.props.imgsrc,
        email: this.props.email,
        message: this.state.message,
      };
    });
    await db.put(this.sentence);
    await this.getMessage();
    this.setState({ message: '' });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  render() {
    // const { message } = this.state;
    db.allDocs({
      include_docs: true,
      attachments: true,
    }).then((result) => {
      const row = result.rows.map((value) => {
        const thisimgsrc = value.doc.imgsrc;
        const thisemail = value.doc.email;
        const thismessage = value.doc.message;
        return {
          thisimgsrc,
          thisemail,
          thismessage,
        };
      });
      this.row = row;
    });
    return (
      <div className={style.message}>
        <Modal
          title="请输入回复内容"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            type="textarea"
            placeholder="回复内容..."
            onChange={this.replyChange}
          />
        </Modal>
        <div>
          <div style={{ fontSize: '18px' }}><strong style={{ color: 'red' }}>{this.row.length}</strong><span>条评论</span></div>
          <div className={style.messagecontainer}>
            {this.row.map(value =>
              <div className={style.imgbox}>
                <Row>
                  <Col span={3}>
                    <img
                      src={value.thisimgsrc}
                      className={style.imgs}
                      alt=""
                    />
                  </Col>
                  <Col span={21}>
                    <a href={`mailto:${value.thisemail}`}><p style={{ color: 'red' }}><strong>{value.thisemail}</strong></p></a>
                    <p>{value.thismessage}</p>
                    <Row>
                      <Col span={21} />
                      <Col span={3}>
                        <Button
                          onClick={this.handleReply}
                          icon="rollback"
                          size="small"
                          email={value.thisemail}
                          ref={(reply) => {
                            this.reply = reply;
                          }}
                        >回复</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>)}
          </div>
        </div>
        <span>请输入留言内容: </span>
        <Row style={{ width: '50%', margin: '0 auto' }}>
          <Col span={20}>
            <Input
              type="textarea"
              placeholder="说点什么吧..."
              autosize={{ minRows: 2, maxRows: 6 }}
              className={style.label}
              value={this.state.message}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </Col>
          <Col span={4}>
            <Row><Button onClick={this.handleClick}>发布留言</Button></Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Message;
