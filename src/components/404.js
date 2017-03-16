import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          Страница не найдена! Вернуться на <Link to='/'>главную</Link>
        </div>
      </div>
    );
  }
}