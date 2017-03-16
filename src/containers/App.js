import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <nav className='navbar navbar-default navbar-top'>
          <div className='container'>
            <div className='navbar-header'>
              <Link to='/' className='navbar-brand'>Invoice App</Link>
            </div>
            <ul className='nav navbar-nav'>
              <li><Link activeClassName='active' to='/invoices'>Invoices</Link></li>
              <li><Link activeClassName='active' to='/products'>Products</Link></li>
              <li><Link activeClassName='active' to='/customers'>Customers</Link></li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.element.isRequired,
};