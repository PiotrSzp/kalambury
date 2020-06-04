import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IFormDialogProps {
  cancelBtn?: string;
  contextText?: string;
  error?: boolean;
  errorMsg?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSubmit: () => void;
  label: string;
  name?: string;
  okBtn?: string;
  open: boolean;
  title: string;
  type?: string;
  value: string;
}

export default function FormDialog(props: IFormDialogProps) {
  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      if (event.key === "Enter" || event.key === "NumpadEnter") {
        props.handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props]);

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{props.contextText}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              variant={"outlined"}
              id={props.name}
              label={props.label}
              type={props.type}
              onChange={props.handleChange}
              value={props.value}
              error={props.error}
              helperText={props.errorMsg}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              {props.cancelBtn}
            </Button>
            <Button onClick={props.handleSubmit} color="primary" type="submit">
              {props.okBtn}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

FormDialog.defaultProps = {
  type: "text",
  cancelBtn: "Wróć",
  okBtn: "OK",
  error: false,
  errorMsg: "",
  name: "name"
};
