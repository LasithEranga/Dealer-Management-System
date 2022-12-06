import { Alert, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../reducers/alertSlice";

const SystemAlerts = () => {
  const alertState = useSelector((state) => state.alertDMS);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [transition, setTransition] = useState(undefined);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(hideAlert());
  };
  useEffect(() => {
    if (alertState.isVisible) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [alertState]);

  useEffect(() => {
    if (open) {
      setMessage(alertState.message);
      setSeverity(alertState.severity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      autoHideDuration={4000}
      sx={{
        "& .css-ngw7h3-MuiPaper-root-MuiSnackbarContent-root": {
          backgroundColor: "transparent",
          boxShadow: 0,
        },
      }}
      message={
        <Alert
          {...(severity.length > 1 && {
            severity: alertState.severity,
          })}
        >
          {message}
        </Alert>
      }
      key={transition ? transition.name : ""}
    />
  );
};

export default SystemAlerts;
