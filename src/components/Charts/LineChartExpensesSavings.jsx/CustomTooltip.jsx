import React from 'react'

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-exp">
          {`Expenses `}
          <span className="tooltip-value">{`$${payload[0].value}`}</span>
        </p>
        <p className="tooltip-sav">
          {`Savings `}
          <span className="tooltip-value">{`$${payload[1].value}`}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip