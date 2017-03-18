import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Button, Col, Table } from 'react-bootstrap';

export default class CreateInvoice extends PureComponent {
  constructor() {
    super();
    this.state = { data: [] };
    this.addProduct = () => {
      const select = document.getElementById('product');
      const selectedProductId = select.options[select.selectedIndex].value;
      console.log(selectedProductId);
      axios.get(`/api/products/${selectedProductId}`)
        .then((res) => {
          console.log(res);
          const newData = [...this.state.data, res.data];
          this.setState({
            data: newData,
          });
        });
    };
  }

  componentWillMount() {
    axios.get('/api/customers')
      .then(res => this.setState({
        customers: res.data,
      }));
    axios.get('/api/products')
      .then(res => this.setState({
        products: res.data,
      }));
  }

  render() {
    return (
      <div >
        <h1>Create invoice</h1>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <label htmlFor='discount'>Discount (%)</label>
              <FormControl type='number' id='discount' />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4}>
              <label htmlFor='customer'>Customer</label>
              <FormControl componentClass='select' id='customer'>
                {(this.state.customers) ?
                    this.state.customers.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      );
                    })
                    :
                    <option value='' disabled>None</option>}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={3}>
              <label htmlFor='product'>Add product</label>
              <FormControl componentClass='select' id='product'>
                {(this.state.products) ?
                    this.state.products.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      );
                    })
                    :
                    <option value='' disabled>None</option>}
              </FormControl>
            </Col>
            <Button onClick={this.addProduct} >Add</Button>
          </FormGroup>
        </Form>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => <tr key={index}><td>{item.name}</td><td>{item.price}</td><td><FormControl type='number' /></td></tr>)}
          </tbody>
        </Table>
      </div>
    );
  }
}
