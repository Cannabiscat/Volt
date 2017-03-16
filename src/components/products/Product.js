import React, { PureComponent } from 'react';
import Template from '../templates/templateList';

export default class Product extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then((res) => {
        const data = res.reduce((acc, item, index) => {
          return acc.concat({
            id: item.id,
            data: {
              idx: index + 1,
              id: item.id,
              name: item.name,
              price: item.price,
            },
          });
        }, []);
        this.setState({ data });
      });
  }

  render() {
    const name = 'Product';
    const columns = {
      1: '#',
      2: 'Name',
      3: 'Price',
    };
    return (
      <div className='row'>
        <Template name={name} columns={columns} data={this.state.data} />
      </div>
    );
  }
}