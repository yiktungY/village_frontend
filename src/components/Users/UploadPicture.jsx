import { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase/firebase";

import axios from "axios";

const UploadPicture = ({ icon }) => {
  //setting image upload
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
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
            .put(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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
      {progress > 0 && (
        <div className="regform__photo">
          <img className="profilePicture" src={url} alt="icon" />
          <h3>Uploaded {progress} %</h3>
        </div>
      )}
      <form className="regform__upload" onSubmit={formHandler}>
        <input className="navLink" type="file" />
        <button>click</button>
      </form>
    </div>
  );
};

export default UploadPicture;
