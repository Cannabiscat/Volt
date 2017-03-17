import React from 'react';

const templateModal = ({ showVariable, close, Content, send }) => {
  // console.log(Content);
  return (
    <Content showVariable={showVariable} close={close} send={send} />
  );
};
templateModal.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
  send: React.PropTypes.func,
  Content: React.PropTypes.func,
};
export default templateModal;