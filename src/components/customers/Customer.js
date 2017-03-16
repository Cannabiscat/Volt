import React, { PureComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Template from '../templates/templateList';

export default class Customer extends PureComponent {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.close = () => {
      this.setState({ showModal: false });
    };
    this.open = () => {
      this.setState({ showModal: true });
    };
  }

  componentWillMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then((res) => {
        const data = res.reduce((acc, item, index) => {
          return acc.concat({
            id: item.id,
            data: {
              idx: index + 1,
              name: item.name,
              address: item.address,
              phone: item.phone,
            },
          });
        }, []);
        this.setState({ data });
      });
  }

  render() {
    const name = 'Customer';
    const columns = {
      1: '#',
      2: 'Name',
      3: 'Address',
      4: 'Phone',
    };
    const modalInstance = (
      <div className='modal'>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            One fine body...
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle='primary'>Save changes</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
    return (
      <div className='row'>
        <Template
          name={name}
          columns={columns}
          data={this.state.data}
          modalOnClickFunction={this.open}
        />
        {modalInstance}
      </div>
    );
  }
}