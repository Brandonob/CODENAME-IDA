import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ItneraryList from "./ItineraryList";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import LoginDialog from "../LoginDia/LoginDial";
import ShareDialog from "../ShareForm/ShareFormDial";
import { selectCurrentItin } from "../CurrentItinerary/currentItinerarySlice";

import {
  updateTime,
  updateTitle,
  updateDate,
  createID,
  selectCurrentItinInfo,
} from "./CurrentItinInfoSlice";
import "./ItineraryDisplay.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  textField: {
    width: 200,
    color: "black",
    fontSize: 20,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
}));

export default function ItineraryDisplay() {
  const classes = useStyles();
  const currentItinerary = useSelector(selectCurrentItin);
  const [ItineraryName, setItineraryName] = useState("My Itinerary");
  const [ItineraryDate, setItinerarydate] = useState("");
  const [ItineraryTime, setItineraryTime] = useState("12:00");
  const [editMode, setEditMode] = useState(false);
  const user = useSelector(selectCurrentItin);
  const [currUser, setcurrUser] = useState(false);
  const [opendia, setOpenDia] = useState(false);
  const [opendiaEmail, setOpenDiaEmail] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;
    setItinerarydate(today);

    dispatch(updateDate(today));
  }, []);

  const handleDiaClose = (value) => {
    setOpenDia(false);
    // setSelectedValue(value);
  };
  const handleEmailDiaClose = (value) => {
    setOpenDiaEmail(false);
    //  setSelectedValue(value);
  };

  const handleClick = () => {
    setEditMode(true);
  };
  const handleDone = () => {
    setEditMode(false);
    dispatch(updateTime(ItineraryTime));
    dispatch(updateTitle(ItineraryName));
    dispatch(updateDate(ItineraryDate));
  };

  const handleClickReview = () => {
    if (!currUser) {
      setOpenDia(true);
    } else {
      setOpenDiaEmail(true);
    }
  };
  const handleClickShare = () => {
    // if (!currUser) {
    //   setOpenDia(true);
    // } else {
    setOpenDiaEmail(true);
    // }
  };

  const navButton = () => {
    return (
      <div id="navItin">
        <IconButton
          onClick={handleClickReview}
          style={{ backgroundColor: "#09BC8A" }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          onClick={handleClickShare}
          style={{ backgroundColor: "#09BC8A" }}
        >
          <ShareIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div class="top" style={{ marginTop: "25px", padding: "0px" }}>
        <div class="menu" style={{ margin: "0px", padding: "0px" }}></div>
      </div>
      <div
        class="time"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0px",
          padding: "0px",
        }}
      >
        <TextField
          name="ItineraryName"
          id="ItineraryName"
          // defaultValue={value}
          value={ItineraryName}
          margin="none"
          style={{ margin: "0px", padding: "0px" }}
          onChange={(e) => setItineraryName(e.target.value)}
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
        <TextField
          name="ItineraryDate"
          id="ItineraryDate"
          type="date"
          style={{ margin: "0px", padding: "0px" }}
          value={ItineraryDate}
          margin="none"
          onChange={(e) => {
            setItinerarydate(e.target.value);
          }}
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
        <TextField
          name="ItineraryDate"
          id="ItineraryDate"
          type="time"
          margin="none"
          style={{ margin: "0px", padding: "0px" }}
          value={ItineraryTime}
          onChange={(e) => {
            setItineraryTime(e.target.value);
          }}
          margin="normal"
          disabled={!editMode}
          className={classes.textField}
          InputProps={{
            classes: {
              disabled: classes.disabled,
            },
          }}
        />
      </div>

      <div className="middle">
        {editMode ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleDone}
              style={{ backgroundColor: "#09BC8A" }}
            >
              <DoneIcon />
            </IconButton>
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClick}
              style={{ backgroundColor: "#09BC8A" }}
            >
              <Edit />
            </IconButton>
          </InputAdornment>
        )}
        <div
          style={{
            marginTop: "35px",
            marginLeft: "10px",
            height: "270px",
            marginRight: "0px",
            overflow: "scroll",
          }}
        >
          <ItneraryList time={ItineraryTime} />
          {currentItinerary.length ? (
            navButton()
          ) : (
            <p
              style={{ marginTop: "50px", color: "crimson", fontSize: "20px" }}
            >
              Add Items to Itinerary
            </p>
          )}
          <LoginDialog open={opendia} onClose={handleDiaClose} />
          <ShareDialog open={opendiaEmail} onClose={handleEmailDiaClose} />
          {/* <SendSmsDialog open={opendiaText} onClose={handleTextItin} /> */}
        </div>
      </div>
    </div>
  );
}