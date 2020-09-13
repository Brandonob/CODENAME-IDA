import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {} from "@material-ui/core/";
import Login from "../Login/Login";
import { blue } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open, handleADD } = props;
  const classes = useStyles();

  const handleClick = () => {
    handleADD();
  };

  const handleCloseEmail = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleCloseEmail}
      aria-labelledby="simple-dialog-title"
      openEmail={open}
    >
      <DialogTitle id="simple-dialog-title">login</DialogTitle>
      {/* <Login />
       */}
      email: <input type="email" placeholder email></input>
    </Dialog>
  );
};

export default SimpleDialog;