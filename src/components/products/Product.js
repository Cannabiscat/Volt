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
        4: '',
      },
      body: CreateProduct,
      url: '/api/products',
      getDataObject: (item, index) => {
        return {
          id: item.id,
          data: {
            idx: index + 1,
            id: item.id,
            name: item.name,
            price: item.price,
          },
        };
      },
    };
  }

  componentWillMount() {
    this.getData();
  }
}