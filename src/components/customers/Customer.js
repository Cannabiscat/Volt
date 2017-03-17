import TemplateComponent from '../templates/TemplateComponent';

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