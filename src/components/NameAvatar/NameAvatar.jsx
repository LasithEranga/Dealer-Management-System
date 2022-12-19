import { Avatar } from "@mui/material";
import React from "react";
import { convertToRupees } from "../../utils/convertToRupees";

const NameAvatar = ({ name = "Lasith", amount = 0, priceEnabled = false }) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name = "") {
    const derivedName = name.substring(0, 2);
    return {
      sx: {
        bgcolor: stringToColor(derivedName),
        color: "white",
      },
      children: `${derivedName}`,
    };
  }
  return (
    <div className="d-flex justify-content-start align-items-center text-nowrap">
      <div>
        <Avatar {...stringAvatar(name)} />
      </div>

      <div className="ps-2">
        <div className="fw-bold">{name}</div>
        {priceEnabled && <div>{convertToRupees(amount)}</div>}
      </div>
    </div>
  );
};

export default NameAvatar;
