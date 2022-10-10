import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";

import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { authAction } from "../../store/login-slice";
import { noticiationActions } from "../../store/noticiation-slice";
import { Loader } from "../Elements";

const UploadPicture = ({ icon, username, image, action }) => {
  //setting image upload

  const [progress, setProgress] = useState(100);
  const [url, setUrl] = useState(icon);
  const formHandler = (e) => {
    const file = e.target.files[0];
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          action(url);
        });
      }
    );
  };

  return (
    <label htmlFor="dropzone-file">
      <div className="absolute bg-gray-200 p-1 w-40 h-40 rounded-full ring-2 opacity-0 hover:opacity-50 z-20 flex justify-center items-center">
        <div>Upload {image}</div>
      </div>
      {progress === 100 ? (
        url ? (
          <img
            className="p-1 w-40 h-40 rounded-full ring-2 ring-gray-300 animate-pulse"
            src={url}
            alt={`${username}`}
          />
        ) : (
          <div className="w-full h-40 bg-gray-600 flex justify-center items-center ">
            <BiPlusCircle className="text-4xl text-green-600" />
          </div>
        )
      ) : (
        <Loader />
      )}
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={(e) => formHandler(e)}
      />
    </label>
  );
};

export default UploadPicture;
