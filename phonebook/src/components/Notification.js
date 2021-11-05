import React from "react";

export default Notification = ({ notification }) => {
  if (notification) {
    return <h2 className={notification.type}>{notification.message}</h2>;
  } else return null;
};
