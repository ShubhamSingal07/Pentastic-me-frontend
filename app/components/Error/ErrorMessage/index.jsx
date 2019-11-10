import React from 'react';

import './style.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message-container">
      <div className="error-message alert alert-danger">
        <i className="fas fa-exclamation-circle" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
