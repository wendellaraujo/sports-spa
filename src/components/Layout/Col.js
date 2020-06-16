import React from 'react';

const Col = (props) => {
  return (
    <div className={`col-sm-${props.sm} col-md-${props.md} col-lg-${props.lg} col-xl-${props.xl} 
                      offset-md-${props.offset} offset-lg-${props.offset}`}>
      {props.children}
    </div>
  )
}

export default Col;
