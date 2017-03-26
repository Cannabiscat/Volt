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
      deleted_items_id: [],
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
          { itemId: item.itemId, itemData: item.itemData, qty: Number(e.target.value), invoice_item_id: item.invoice_item_id } :
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
      const removeInvoiceItemId = Number(e.target.dataset.invoice_item_id);
      const newSource = this.state.data.source.filter(item => item.itemId !== removeID);
      this.setState({
        deleted_items_id: [...this.state.deleted_items_id, removeInvoiceItemId],
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
      if (!this.props.params.invoice) {
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
      const sendInvoiceData = {
        customer_id: this.state.currentCustomer,
        discount: this.state.discount,
        total: this.state.total,
      };
      this.state.deleted_items_id.map(item => axios.delete(`/api/invoices/${this.props.params.invoice}/items/${item}`));
      axios.put(`/api/invoices/${this.props.params.invoice}`, sendInvoiceData)
        .then(() => {
          this.state.data.source.map((item) => {
            if (item.invoice_item_id) {
              axios.put(`/api/invoices/${this.props.params.invoice}/items/${item.invoice_item_id}`, {
                product_id: item.itemData.id,
                quantity: item.qty,
              });
            } else {
              axios.post(`/api/invoices/${this.props.params.invoice}/items/`, {
                product_id: item.itemData.id,
                quantity: item.qty,
              });
            }
            return item;
          });
        }).then(() => browserHistory.push('/invoices'));
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
      }))
      .then(() => {
        axios.get(`/api/invoices/${this.props.params.invoice}`)
          .then((res) => {
            if (res.data) {
              document.getElementById('discount').value = res.data.discount || '0';
              this.setState({ currentCustomer: res.data.customer_id });
            }
          });
      })
      .then(() => {
        if (this.props.params.invoice !== undefined) {
          axios.get(`/api/invoices/${this.props.params.invoice}/items`)
            .then((res) => {
              const data = res.data.reduce((acc, item, index) => {
                const newItem = {
                  itemData: {
                    id: item.product_id,
                    name: this.state.products
                      .filter(prodItem => prodItem.id === item.product_id)[0].name,
                    price: this.state.products
                      .filter(prodItem => prodItem.id === item.product_id)[0].price,
                  },
                  itemId: index + 1,
                  qty: item.quantity,
                  invoice_item_id: item.id,
                };
                return { nextIndexForIterateElement: index + 2, source: [...acc.source, newItem] };
              }, { source: [] });
              this.setState({ data });
            });
        }
      });
  }

  componentDidUpdate() {
    this.getTotal();
  }

  render() {
    const selectOptionsCustomer = (this.state.customers) ?
      this.state.customers.map((item) => {
        return (
          <option key={item.id} value={item.id}>{item.name}</option>
        );
      })
      :
      <option value=''>None</option>;

    const tableListOfProducts = this.state.data.source.map((item) => {
      const quantity = (item.qty) ? item.qty : '1';
      return (
        <tr key={item.itemId} id={item.itemId} className='invoiceProduct'>
          <td>{item.itemData.name}</td>
          <td id={`price-${item.itemId}`}>{item.itemData.price}</td>
          <td id={`qty-${item.itemId}`}>
            <FormControl type='number' defaultValue={quantity} onChange={this.addProductQuantity} data-id={item.itemId} />
          </td>
          <td><Button bsStyle='danger' onClick={this.removeProduct} data-id={item.itemId} data-invoice_item_id={item.invoice_item_id}>Delete</Button></td>
        </tr>);
    });

    return (
      <div >
        <h1>{(this.props.params.invoice === undefined) ? 'Create' : 'Edit' } invoice</h1>
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
              <FormControl componentClass='select' id='customer' value={(this.state.currentCustomer) ? this.state.currentCustomer : ''} onChange={(e) => { this.setState({ currentCustomer: Number(e.target.value) }); }}>
                {selectOptionsCustomer}
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
              {tableListOfProducts}
            </tbody>
          </Table>
          <h1>Total: {this.state.total}</h1>
          <Col sm={11}>
            <Button type='submit' bsStyle='info'>Save Invoice</Button>
          </Col>
          <Col sm={1}>
            <Link to='/invoices' className='btn btn-default'>Cancel</Link>
          </Col>
        </Form>
      </div>
    );
  }
}

CreateInvoice.propTypes = {
  params: React.PropTypes.object,
};