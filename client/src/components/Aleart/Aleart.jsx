import React, { useState } from 'react';
import './alert.scss';

function Aleart({ type, message }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className={`alert alert-${type}`}>
          <div className="alert-message">{message}</div>
        </div>
      )}
    </>
  );
}

export default Aleart;
