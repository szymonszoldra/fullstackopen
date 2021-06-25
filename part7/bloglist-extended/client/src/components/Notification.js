import React from 'react';

import { useSelector } from 'react-redux';

const Notification = () => {

  const notification = useSelector(state => state.notification);

  if (!notification) return null;

  return (
    <div className={notification.positive ? 'positive' : 'error'}>
      {notification.content}
    </div>
  );
};


export default Notification;