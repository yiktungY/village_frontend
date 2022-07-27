import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/firebase";
import React, { useState } from "react";

function UploadPicture(props) {
  //setting image upload
  const [progress, setProgress] = useState(0);

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
          setState(url)
            //   axios
            //     .put(
            //       `${SERVER_URL}/posts/${props.getPost.id}`,
            //       { avatar_url: url },
            //       {
            //         withCredentials: true,
            //       }
            //     )
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err))
        );
      }
    );
  };
  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      {/* <h3>Uploaded {progress} %</h3> */}
    </div>
  );
}

export default UploadPicture;
