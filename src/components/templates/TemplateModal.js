import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const templateModal = ({ showVariable, close }) => {
  return (
    <div className='modal'>
      <Modal show={showVariable} onHide={close}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={close}>Close</Button>
          <Button bsStyle='primary'>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
templateModal.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
};
export default templateModal;