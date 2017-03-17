import TemplateComponent from '../templates/TemplateComponent';
import CreateCustomer from './CreateCustomer';

export default class Customer extends TemplateComponent {
  constructor() {
    super();
    this.state = {
      name: 'Customer',
      columns: {
        1: '#',
        2: 'Name',
        3: 'Address',
        4: 'Phone',
      },
      body: CreateCustomer,
      url: '/customers',
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
}