import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { authAction } from "../../store/login-slice";
import { noticiationActions } from "../../store/noticiation-slice";
import { Loader } from "../Elements";

const UploadPicture = ({ icon, username, id }) => {
  //setting image upload
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(100);

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
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          axios
            .put(`${import.meta.env.VITE_API_URL}/users/${id}`, {
              avatar_url: url,
            })
            .then((data) => {
              dispatch(authAction.updateInfo({ icon: url }));
              dispatch(
                noticiationActions.showMessage("Your new icon looks great!")
              );
            })
            .catch((err) => console.log(err))
        );
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-40 relative">
        <label htmlFor="dropzone-file" className="">
          <div className="absolute bg-gray-200 p-1 w-40 h-40 rounded-full ring-2 opacity-0 hover:opacity-50 z-20 flex justify-center items-center">
            <div>upload Icon</div>
          </div>
          {progress === 100 ? (
            <img
              className="p-1 w-40 h-40 rounded-full ring-2 ring-gray-300 animate-pulse"
              src={icon}
              alt={`${username} icon`}
            />
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
      </div>
    </div>
  );
};

export default UploadPicture;
