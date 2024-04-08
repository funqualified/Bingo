import { Snackbar } from "@mui/joy";
import { useState, useEffect } from "react";

function ToastComponent(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.message !== "") {
      setMessage(props.message);
      setOpen(true);
    }
  }, [props.message]);

  return (
    <Snackbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5em",
      }}
      open={open}
      autoHideDuration={1200}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setOpen(false);
      }}>
      {message}
    </Snackbar>
  );
}

export default ToastComponent;
