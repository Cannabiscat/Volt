import React from 'react';
import { Form, FormControl, Modal, Button } from 'react-bootstrap';

const CreateCustomer = ({ showVariable, close }) => {
  return (
    <Modal show={showVariable} onHide={close}>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormControl type='text' />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
        <Button bsStyle='primary'>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};
CreateCustomer.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
};
export default CreateCustomer;