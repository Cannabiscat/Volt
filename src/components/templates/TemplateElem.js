import React from 'react';

const templateElems = ({ data, dataId, editOnClick }) => {
  const row = Object.keys(data).map((item, index) => {
    return [item, index];
  }).map((item) => {
    return (item[0] === 'id') ? null : <td key={item[1]}>{data[item[0]]}</td>;
  });
  return (
    <tr data-id={dataId}>
      {row}
      <td>
        <a href='' className='edit-button' onClick={editOnClick}>Edit</a>
      </td>
    </tr>
  );
};
templateElems.propTypes = {
  data: React.PropTypes.object,
  dataId: React.PropTypes.number,
  editOnClick: React.PropTypes.func,
};
export default templateElems;