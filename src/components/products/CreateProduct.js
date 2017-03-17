import React from 'react';
import { Form, FormControl, FormGroup, Modal, Button } from 'react-bootstrap';

const CreateCustomer = ({ showVariable, idToEdit, close, send, initialData }) => {
  return (
    <Modal show={showVariable} onHide={close}>
      <Modal.Header>
        <Modal.Title>{(idToEdit === 'none') ? 'Create new' : 'Edit'} product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={send(idToEdit)} name='CreateCustomer'>
          <FormGroup>
            <FormControl type='text' placeholder='Name' data-id='name' defaultValue={(initialData && initialData.data) ? initialData.data.name : ''} />
          </FormGroup>
          <FormGroup>
            <FormControl type='number' step='0.01' placeholder='Price' data-id='price' defaultValue={(initialData && initialData.data) ? initialData.data.price : ''} />
          </FormGroup>
          <FormGroup className='buttons-container'>
            <Button onClick={close}>Cancel</Button>
            <Button bsStyle='primary' type='submit'>Submit</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
CreateCustomer.propTypes = {
  showVariable: React.PropTypes.bool,
  close: React.PropTypes.func,
  send: React.PropTypes.func,
  initialData: React.PropTypes.object,
  idToEdit: React.PropTypes.string,
};
export default CreateCustomer;