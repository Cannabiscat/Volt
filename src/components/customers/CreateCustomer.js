import React from 'react';
import { Form, FormGroup, FormControl, Modal, Button } from 'react-bootstrap';

const CreateCustomer = ({ showVariable, close, send }) => {
  return (
    <Modal show={showVariable} onHide={close}>
      <Modal.Header>
        <Modal.Title>Create new customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='42' onSubmit={send}>
          <FormGroup>
            <FormControl type='text' placeholder='Name' data-id='name' />
          </FormGroup>
          <FormGroup>
            <FormControl type='text' placeholder='Address' data-id='address' />
          </FormGroup>
          <FormGroup>
            <FormControl type='phone' data-id='phone' />
          </FormGroup>
          <Button onClick={close}>Cancel</Button>
          <Button bsStyle='primary' type='submit'>Save changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
CreateCustomer.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
  send: React.PropTypes.func,
};
export default CreateCustomer;