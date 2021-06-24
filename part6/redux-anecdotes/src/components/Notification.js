import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.length) {
    return (
      <div style={style}>
        {notification}
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);