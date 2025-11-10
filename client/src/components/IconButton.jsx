import React from "react";

const IconButton = ({ text, icon, className = "", type = "button", ...rest }) => {
  const classes = ["icon-button", className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {icon ? <span className="icon-button__icon">{icon}</span> : null}
      {text ? <span className="icon-button__text">{text}</span> : null}
    </button>
  );
};

export default IconButton;

