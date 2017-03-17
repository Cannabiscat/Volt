import React from 'react';
import { Form, FormGroup, FormControl, Modal, Button } from 'react-bootstrap';

const CreateCustomer = ({ showVariable, idToEdit, close, send, initialData }) => {
  return (
    <Modal show={showVariable} onHide={close}>
      <Modal.Header>
        <Modal.Title>{(idToEdit === 'none') ? 'Create new' : 'Edit'} customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={send(idToEdit)} name='CreateCustomer'>
          <FormGroup>
            <FormControl type='text' placeholder='Name' data-id='name' defaultValue={(initialData && initialData.data) ? initialData.data.name : ''} />
          </FormGroup>
          <FormGroup>
            <FormControl type='text' placeholder='Address' data-id='address' defaultValue={(initialData && initialData.data) ? initialData.data.address : ''} />
          </FormGroup>
          <FormGroup>
            <FormControl type='tel' data-id='phone' defaultValue={(initialData && initialData.data) ? initialData.data.phone : ''} />
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