import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TemplateModalDeleteConfirm = ({ showVariable, close, del }) => {
  return (
    <Modal show={showVariable} onHide={close}>
      <Modal.Header>
        <Modal.Title className='confirm'>Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body className='buttons-container'>
        <Button bsStyle='success' onClick={close}>No</Button>
        <Button bsStyle='danger' onClick={del}>Yes</Button>
      </Modal.Body>
    </Modal>
  );
};
TemplateModalDeleteConfirm.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
  del: React.PropTypes.func,
};
export default TemplateModalDeleteConfirm;