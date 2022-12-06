import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  pr: 0,
  borderRadius: 1,
};
const StepTwo = ({ orderList }) => {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      open={open}
      disableAutoFocus={true}
      onClose={() => {
        setOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      asdasd
    </Modal>
  );
};

export default StepTwo;
