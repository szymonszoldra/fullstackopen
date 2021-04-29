import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  
  if (!message) return null;

  return (
    <div className={message.positive ? 'positive' : 'error'}>
      {message.content}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}

export default Notification;