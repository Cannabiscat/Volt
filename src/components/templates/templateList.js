import React from 'react';
import TemplateElem from './templateElems';

const template = ({ name, columns, data, modalOnClickFunction }) => {
  return (
    <div>
      <div className='col-md-12'>
        <h1><strong>{name} List</strong><button className='btn btn-default'>Create</button></h1>
      </div>
      <table className='user-list table table-striped'>
        <thead>
          <tr>
            {Object.keys(columns).map(item => <th key={item}>{ columns[item] }</th>)}
          </tr>
        </thead>
        <tbody>
          {(data) ?
          data.map(item => <TemplateElem data={item.data} key={item.data.idx} dataId={item.id} onClickFunction={modalOnClickFunction} />) :
          ''}
        </tbody>
      </table>
    </div>
  );
};
template.propTypes = {
  name: React.PropTypes.string.isRequired,
  columns: React.PropTypes.object.isRequired,
  data: React.PropTypes.array,
  modalOnClickFunction: React.PropTypes.func,
};
export default template;