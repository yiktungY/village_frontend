import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/firebase";
import React, { useState } from "react";
import "./UploadPicture.scss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import Button from "@mui/material/Button";
const SERVER_URL = "http://localhost:8080";
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
            .put(
              `${SERVER_URL}/users/${props.userInfo.id}`,
              { avatar_url: url },
              {
                withCredentials: true,
              }
            )
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
      <form className="regform__upload" onSubmit={formHandler}>
        <p>Change your profile Picture from google default: </p>
        <input className="navLink" type="file" />
        <button type="submit" className="noStyle">
          <Button variant="contained">Upload</Button>
        </button>
      </form>
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
    </div>
  );
}

export default UploadPicture;
