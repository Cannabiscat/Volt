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
      axios(this.state.url)
      .then(res => res.data)
      .then((res) => {
        res.map((item, index) => {
          axios.get(`/api/customers/${item.customer_id}`).then(resolve => resolve.data).then((r) => {
            const dataItem = {
              idx: index + 1,
              customer: r.name,
              discount: item.discount,
              total: item.total,
            };
            return dataItem;
          }).then((r) => {
            this.setState({ data: this.state.data.concat([{ id: item.id, data: r }]) });
          });
          return item;
        });
      });
    };
    this.createButton = <Link className='btn btn-default create' to='/invoices/create'>Create</Link>;
    this.delete = () => {
      axios.delete(`/api/invoices/${this.state.idToDelete}`).then(() => this.setState({ showConfirmModal: false })).then(() => browserHistory.push('/invoices'));
    };
  }

  componentWillMount() {
    this.getData();
  }
}
