import React from 'react';

export const Notification = ({ message }) => {
  
  if (!message) return null;

  return (
    <div className={message.positive ? 'positive' : 'error'}>
      {message.content}
    </div>
  )
}