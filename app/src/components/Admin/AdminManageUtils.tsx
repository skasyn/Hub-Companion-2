import React from "react";
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";

interface DeleteDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  const handleClose = (value: boolean) => {
    props.onClose(value);
  };

  return (
    <Dialog open={props.open} onClose={() => handleClose(false)}>
      <DialogContent>
        <Typography variant="h5" style={{fontSize: '1em'}}>
          Are you sure you want to delete ?
        </Typography>
        <Button color="secondary" onClick={() => handleClose(true)}>
          Delete
        </Button>
        <Button color="primary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};
