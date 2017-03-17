import TemplateComponent from '../templates/TemplateComponent';

export default class InvoiceList extends TemplateComponent {
  constructor() {
    super();
    this.state = {
      name: 'Invoice',
      columns: {
        1: '#',
        2: 'customer',
        3: 'discount',
        4: 'total',
      },
    };
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
}
