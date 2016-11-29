import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MainActions from './actions';
// import Name from 'components/Name';
import Header from './components/Header';
import Message from './components/Message';
// import cat from 'images/cat.jpg';
// import PouchDB from 'pouchdb';

// const db = new PouchDB('http://localhost:5984/messageboard');

function mapStateToProps(state) {
  const { main } = state;
  return { main };
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators(MainActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  static propTypes = {
    main: PropTypes.object.isRequired,
    mainActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    main: PropTypes.object,
    mainActions: PropTypes.object,
  };

  getChildContext() {
    const { main, mainActions } = this.props;
    return { main, mainActions };
  }

  // componentDidMount() {
  //   const doc = {
  //     _id: 'hellos',
  //     name: 'hello',
  //     occupation: 'hello',
  //     age: 3,
  //   };
  //   db.put(doc);
  //   db.get('hellos').then((xdoc) => {
  //     console.log(xdoc);
  //   });
  //   db.info().then((info) => {
  //     console.log(info);
  //   });
  // }
  render() {
    const { message, imgsrc, email } = this.props.main.toJS();
    return (
      <div className={style.content}>
        <Header imgsrc={imgsrc} email={email} />
        <div className={style.main} >
          <Message message={message} imgsrc={imgsrc} email={email} />
        </div>
      </div>
    );
  }
}

export default Main;
