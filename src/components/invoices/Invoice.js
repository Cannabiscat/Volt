import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import TemplateComponent from '../templates/TemplateComponent';

export default class InvoiceList extends TemplateComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      name: 'Invoice',
      columns: {
        1: '#',
        2: 'customer',
        3: 'discount',
        4: 'total',
        5: '',
      },
      body: () => {
        return null;
      },
      url: '/api/invoices',
    };
    this.getData = () => {
      axios.get('/api/customers')
      .then(res => this.setState({
        customers: res.data,
      }))
      .then(() => {
        axios(this.state.url)
        .then(res => res.data)
        .then((res) => {
          const data = res.reduce((acc, item, index) => {
            const dataitem = {
              idx: index + 1,
              customer: this.state.customers.filter(custItem => custItem.id === item.customer_id)[0]
                .name,
              discount: item.discount,
              total: item.total,
            };
            return [...acc, { id: item.id, data: dataitem }];
          }, []);
          this.setState({ data });
        });
      });
    };
    this.createButton = <Link className='btn btn-default create' to='/invoices/create' data={'hi'} >Create</Link>;
    this.openEdit = (e) => {
      browserHistory.push(`/invoices/${e.target.dataset.id}`);
    };
    this.delete = () => {
      axios.delete(`/api/invoices/${this.state.idToDelete}`)
        .then(() => { this.getData(); return this.setState({ showConfirmModal: false }); });
    };
  }

  componentWillMount() {
    this.getData();
  }
}
