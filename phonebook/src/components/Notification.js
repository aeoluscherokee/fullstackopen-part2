import React from "react";

const Notification = ({ notification }) => {
  if (notification) {
    return <h2 className={notification.type}>{notification.message}</h2>;
  } else return null;
};
export default Notification
