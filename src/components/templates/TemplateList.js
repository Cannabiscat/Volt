import React from 'react';
import TemplateElem from './TemplateElem';

const template = ({ name, columns, data, editOnClick, deleteOnClick, createButton }) => {
  return (
    <div>
      <div className='col-md-12'>
        <h1><strong>{name} List</strong>{createButton}</h1>
      </div>
      <table className='user-list table table-striped'>
        <thead>
          <tr>
            {Object.keys(columns).map(item => <th key={item}>{ columns[item] }</th>)}
          </tr>
        </thead>
        <tbody>
          {(data) ?
          data.map(item => <TemplateElem
            data={item.data}
            key={item.data.idx}
            dataId={item.id}
            editOnClick={editOnClick}
            deleteOnClick={deleteOnClick}
          />) :
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
  editOnClick: React.PropTypes.func,
  deleteOnClick: React.PropTypes.func,
  createButton: React.PropTypes.element.isRequired,
};
export default template;