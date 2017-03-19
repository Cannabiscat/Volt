import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Button, Col, Table } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

export default class CreateInvoice extends PureComponent {
  constructor() {
    super();
    this.state = {
      id: null,
      data: {
        nextIndexForIterateElement: 1,
        source: [],
      },
      total: 0,
    };

    this.addProduct = () => {
      const select = document.getElementById('product');
      const selectedProductId = select.options[select.selectedIndex].value;
      axios.get(`/api/products/${selectedProductId}`)
        .then((res) => {
          const newData = [...this.state.data.source, {
            itemId: this.state.data.nextIndexForIterateElement,
            itemData: res.data,
            qty: 1,
          }];
          this.setState({
            data: {
              nextIndexForIterateElement: this.state.data.nextIndexForIterateElement + 1,
              source: newData,
            },
          });
        });
    };

    this.addProductQuantity = (e) => {
      const productId = Number(e.target.dataset.id);
      const newSource = this.state.data.source.map((item) => {
        const newItem = (item.itemId === productId) ?
          { itemId: item.itemId, itemData: item.itemData, qty: Number(e.target.value) } :
          item;
        return newItem;
      });
      this.setState({
        data: {
          nextIndexForIterateElement: this.state.data.nextIndexForIterateElement,
          source: newSource,
        },
      });
    };

    this.removeProduct = (e) => {
      const removeID = Number(e.target.dataset.id);
      const newSource = this.state.data.source.filter(item => item.itemId !== removeID);
      this.setState({
        data: {
          nextIndexForIterateElement: this.state.data.nextIndexForIterateElement,
          source: newSource,
        },
      });
    };

    this.getTotal = () => {
      const price = this.state.data.source
        .reduce((acc, item) => acc + (item.qty * item.itemData.price), 0);
      const discount = Number(document.getElementById('discount').value);
      const total = Math.round(price * (100 - discount)) / 100;
      this.setState({ total, discount });
    };

    this.sendData = (e) => {
      e.preventDefault();
      if (!this.state.id) {
        this.createNewInvoice();
      } else {
        this.updateInvoice();
      }
    };

    this.createNewInvoice = () => {
      const sendInvoiceData = {
        customer_id: this.state.currentCustomer,
        discount: this.state.discount,
        total: this.state.total,
      };
      axios.post('/api/invoices', sendInvoiceData)
        .then((res) => {
          this.state.data.source.map((item) => {
            axios.post(`/api/invoices/${res.data.id}/items`, {
              product_id: item.itemData.id,
              quantity: item.qty,
            }).then(() => browserHistory.push('/invoices'));
            return item;
          });
        });
    };

    this.updateInvoice = () => {

    };
  }

  componentWillMount() {
    axios.get('/api/customers')
      .then(res => this.setState({
        customers: res.data,
        currentCustomer: res.data[0].id,
      }));
    axios.get('/api/products')
      .then(res => this.setState({
        products: res.data,
      }));
  }

  componentDidUpdate() {
    this.getTotal();
  }

  render() {
    return (
      <div >
        <h1>Create invoice</h1>
        <Form horizontal onSubmit={this.sendData}>
          <FormGroup>
            <Col sm={2}>
              <label htmlFor='discount'>Discount (%)</label>
              <FormControl type='number' id='discount' defaultValue='0' onChange={this.getTotal} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={4}>
              <label htmlFor='customer'>Customer</label>
              <FormControl componentClass='select' id='customer' onChange={(e) => { this.setState({ currentCustomer: Number(e.target.value) }); }}>
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
          <Table responsive className='invoiceProductTable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.source.map(item => (
                <tr key={item.itemId} id={item.itemId} className='invoiceProduct'>
                  <td>{item.itemData.name}</td>
                  <td id={`price-${item.itemId}`}>{item.itemData.price}</td>
                  <td id={`qty-${item.itemId}`}>
                    <FormControl type='number' defaultValue='1' onChange={this.addProductQuantity} data-id={item.itemId} />
                  </td>
                  <td><Button bsStyle='danger' onClick={this.removeProduct} data-id={item.itemId}>Delete</Button></td>
                </tr>))}
            </tbody>
          </Table>
          <h1>Total: {this.state.total}</h1>
          <Col sm={11}>
            <Button type='submit' bsStyle='info'>Submit</Button>
          </Col>
          <Col sm={1}>
            <Link to='/invoices' className='btn btn-default'>Cancel</Link>
          </Col>
        </Form>
      </div>
    );
  }
}
