import React from 'react';

const Table = (props) => {
  return (
    <table className={"table " + props.tablestriped + props.tablebordered}>
        {props.children}
    </table>
  );
}

export default Table;
