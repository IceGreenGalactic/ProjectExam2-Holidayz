import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconWithOverlay = ({
  mainIcon,
  overlayIcon,
  overlayStyle = {},
  title = "",
}) => (
  <span style={{ position: "relative", display: "flex" }}>
    <FontAwesomeIcon
      icon={mainIcon}
      title={title}
      style={{
        color: "gray",
      }}
    />

    {overlayIcon && (
      <FontAwesomeIcon
        icon={overlayIcon}
        style={{
          position: "absolute",
          top: "0",
          left: "0",

          ...overlayStyle,
        }}
      />
    )}
  </span>
);

export default IconWithOverlay;
