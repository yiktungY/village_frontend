import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/firebase";
import React, { useState } from "react";
import "./UploadPicture.scss";

import Button from "@mui/material/Button";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com/";
import axios from "axios";

function UploadPicture(props) {
  //setting image upload
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    console.log("aaaa");
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          axios
            .put(`${SERVER_URL}/users/${props.userInfo.id}`, {
              avatar_url: url,
            })
            .then((data) => {
              setUrl(url);
              console.log(data);
            })
            .catch((err) => console.log(err))
        );
      }
    );
  };
  return (
    <div className="regform">
      {progress ? (
        <div className="regform__photo">
          <img className="profilePicture" src={url} alt="icon" />
          <h3>Uploaded {progress} %</h3>
        </div>
      ) : (
        <img
          className="profilePicture"
          src={props.userInfo.avatar_url}
          alt="icon"
        />
      )}
      <form className="regform__upload" onSubmit={formHandler}>
        <input className="navLink" type="file" />
        <div className="createPostButton">
          <button className="noStyle" type="submit">
            <Button variant="contained">Submit</Button>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadPicture;
