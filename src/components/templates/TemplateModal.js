import React from 'react';

const templateModal = ({ showVariable, idToEdit, close, Content, send, initialData }) => {
  return (
    <Content
      showVariable={showVariable}
      close={close}
      send={send}
      initialData={initialData}
      idToEdit={idToEdit}
    />
  );
};
templateModal.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
  send: React.PropTypes.func,
  Content: React.PropTypes.func,
  initialData: React.PropTypes.object,
  idToEdit: React.PropTypes.string,
};
export default templateModal;