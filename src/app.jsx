import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';
import Product from './components/products/Product';
import Customer from './components/customers/Customer';
import Invoice from './components/invoices/Invoice';
import CreateInvoice from './components/invoices/CreateInvoice';
import NotFound from './components/404';
import Home from './components/Home';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'react-select/dist/react-select.css';


render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='invoices' component={Invoice} />
      <Route path='/invoices/create' component={CreateInvoice} />
      <Route path='/invoices/:invoice' component={Home} />
      <Route path='customers' component={Customer} />
      <Route path='products' component={Product} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('app-root'));
