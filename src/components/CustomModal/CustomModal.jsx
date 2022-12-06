import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  maxHeight: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,

  borderRadius: 0.5,
};

export default function CustomModal({
  open,
  setOpen,
  children,
  width = 500,
  pr = 0,
}) {
  return (
    <div>
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
        <Fade in={open}>
          <Box sx={{ ...style, width, pr }}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
