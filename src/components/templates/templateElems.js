import React from 'react';

const templateElems = ({ data, dataId, onClickFunction }) => {
  const row = Object.keys(data).map((item, index) => {
    return [item, index];
  }).map((item) => {
    return (item[0] === 'id') ? null : <td key={item[1]}>{data[item[0]]}</td>;
  });
  return (
    <tr data-id={dataId} onClick={onClickFunction}>
      {row}
    </tr>
  );
};
templateElems.propTypes = {
  data: React.PropTypes.object,
  dataId: React.PropTypes.number,
};
export default templateElems;