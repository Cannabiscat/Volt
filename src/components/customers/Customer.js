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
        5: '',
      },
      body: CreateCustomer,
      url: '/api/customers',
      getDataObject: (item, index) => {
        return {
          id: item.id,
          data: {
            idx: index + 1,
            name: item.name,
            address: item.address,
            phone: item.phone,
          },
        };
      },
    };
  }

  componentWillMount() {
    this.getData();
  }
}