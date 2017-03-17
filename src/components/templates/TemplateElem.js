import React from 'react';

const templateElems = ({ data, dataId, editOnClick, deleteOnClick }) => {
  const row = Object.keys(data).map((item, index) => {
    return [item, index];
  }).map((item) => {
    return (item[0] === 'id') ? null : <td key={item[1]}>{data[item[0]]}</td>;
  });
  return (
    <tr >
      {row}
      <td>
        <div className='buttons-cell'>
          <button className='edit-button btn btn-success' data-id={dataId} onClick={editOnClick}>Edit</button>
          <button className='delete-button btn btn-danger' data-id={dataId} onClick={deleteOnClick}>Delete</button>
        </div>
      </td>
    </tr>
  );
};
templateElems.propTypes = {
  data: React.PropTypes.object,
  dataId: React.PropTypes.number,
  editOnClick: React.PropTypes.func,
  deleteOnClick: React.PropTypes.func,
};
export default templateElems;