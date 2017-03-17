import TemplateComponent from '../templates/TemplateComponent';
import CreateProduct from './CreateProduct';

export default class Product extends TemplateComponent {
  constructor() {
    super();
    this.state = {
      name: 'Products',
      columns: {
        1: '#',
        2: 'Name',
        3: 'Price',
      },
      body: CreateProduct,
    };
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
}