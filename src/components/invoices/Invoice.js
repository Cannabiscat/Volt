import React, { PureComponent } from 'react';
import Template from '../templates/templateList';

export default class InvoiceList extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    fetch('/api/invoices')
      .then(res => res)
      .then((res) => {
        const data = (data) && res.reduce((acc, item, index) => {
          return acc.concat({
            id: data.id,
            data: {
              idx: index + 1,
              id: item.id,
              customer_id: item.customer_id,
              disount: item.discount,
              total: item.total,
            },
          });
        }, []);
        this.setState({ data });
      });
  }

  render() {
    const name = 'Invoice';
    const columns = {
      1: '#',
      2: 'customer',
      3: 'discount',
      4: 'total',
    };
    return (
      <div className='row'>
        <Template name={name} columns={columns} />
      </div>
    );
  }
}
