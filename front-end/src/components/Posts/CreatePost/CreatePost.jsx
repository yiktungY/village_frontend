import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "./CreatePost.scss";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import ControlledRadioButtonsGroup from "../../Mui/Mui";
import LoginButton from "../../Button/LoginButton/LoginButton";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/firebase";

const SERVER_URL = "http://localhost:8080";

function CreatePost(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [payMethodvalue, setpayMethodValue] = useState("Non-Monetary Payment");
  const [monPayMethod, setMonPayMethod] = useState(true);
  const [pictureUrl, setpictureUrl] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      status: "open to apply",
      type: "",
      salary: "",
      requireDate: "",
      estimate_time: "",
      salary_replacement: "",
    },
  });

  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const MonPayMethodFunction = () => {
    if (payMethodvalue === "Money") {
      setMonPayMethod(false);
    } else setMonPayMethod(true);
  };

  useEffect(() => {
    loginFunction();
    MonPayMethodFunction();
  }, [payMethodvalue]);

  const handleChange = (event) => {
    setpayMethodValue(event.target.value);
  };

  const handleFormSubmit = (data) => {
    axios
      .post(
        `${SERVER_URL}/posts`,
        {
          picture_Details: pictureUrl,
          title: data.title,
          content: data.content,
          status: data.status,
          type: data.type.value,
          requireDate: data.requireDate,
          salary: data.salary,
          salary_replacement: data.salary_replacement,
          estimate_time: data.estimate_time.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log(data);
        // setGetPost(data.id);
      })
      .catch((err) => {
        console.log("Error creating a new post:", err);
      });
  };

  //upload picture
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
          setpictureUrl(url)
        );
      }
    );
  };

  return (
    <section className="createPage">
      {isLoggedIn ? (
        <>
          <h1>Create New Post</h1>
          <div>
            <form onSubmit={formHandler}>
              <input type="file" className="input" />
              <button type="submit">Upload</button>
            </form>
            {/* <h3>Uploaded {progress} %</h3> */}
          </div>
          <form
            className="create-post"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="create-post__textInfo">
              <div className="subTitle">TITLE: </div>
              <input
                className="input"
                {...register("title", { required: "This is required." })}
                placeholder="something like: Looking for a dog walker"
              />
              <p>{errors.title?.message}</p>
              <div className="subTitle">DETAIlS: </div>
              <input
                className="input details"
                {...register("content", { required: "This is required." })}
                placeholder="I need a dog walker"
              />
              <p>{errors.content?.message}</p>
              <section className="dropdown">
                <div className="subTitle">Type</div>

                <Controller
                  name="type"
                  className="dropdowninside"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isClearable
                      {...field}
                      options={[
                        { value: "a", label: "a" },
                        { value: "b", label: "b" },
                        { value: "c", label: "c" },
                        { value: "d", label: "d" },
                        { value: "e", label: "e" },
                        { value: "f", label: "f" },
                      ]}
                    />
                  )}
                />
              </section>
            </div>
            <div className="create-post__otherInfo">
              <div className="create-post__otherInfo--payment">
                <ControlledRadioButtonsGroup
                  handleChange={handleChange}
                  value={payMethodvalue}
                  control={control}
                />
                {monPayMethod ? (
                  <div>
                    <div className="subTitle">
                      What would you like to offer except money?
                    </div>
                    <input
                      className="input"
                      {...register("salary_replacement", {
                        required: "This is required.",
                      })}
                      placeholder="a dozen of beer"
                    />
                    <p>{errors.salary_replacement?.message}</p>
                  </div>
                ) : (
                  <div>
                    <div className="subTitle">
                      Show a range you would like to offer:{" "}
                    </div>
                    <input
                      className="input"
                      {...register("salary", { required: "This is required." })}
                      placeholder="CA$20 - CA$25  per hour"
                    />
                    <p>{errors.salary?.message}</p>
                  </div>
                )}
              </div>
              <div className="create-post__otherInfo--other">
                <section>
                  <div className="subTitle">Require Date</div>
                  <Controller
                    control={control}
                    name="requireDate"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="input"
                        placeholderText="Select date"
                        onChange={(e) => field.onChange(e)}
                        selected={field.value}
                      />
                    )}
                  />
                </section>
                <section className="dropdown">
                  <div className="subTitle">Estimate Working Hour</div>
                  <Controller
                    name="estimate_time"
                    className="dropdowninside"
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        {...field}
                        options={[
                          {
                            value: "less than 30mins",
                            label: "less than 5mins",
                          },
                          { value: "Hours", label: "Hours" },
                          { value: "0.5 - 1 hour", label: "0.5 - 1 hour" },
                          { value: "2 hours", label: "2 hours" },
                          { value: "3 - 5 hours", label: "3 - 5 hours" },
                          { value: "5 - 10 hours", label: "5 - 10 hours" },
                          { value: "Days", label: "Days" },
                          { value: "within 1 day", label: "within 1 day" },
                          { value: "1 - 3 days", label: "1 - 3 days" },
                          { value: "Weeks", label: "Weeks" },
                          { value: "within 1 week", label: "within 1 week" },
                          { value: "1 - 2 weeks", label: "1 - 2 weeks" },
                          { value: "Months", label: "Months" },
                        ]}
                      />
                    )}
                  />
                </section>
              </div>
              <input className="button" type="submit" />
            </div>
          </form>
        </>
      ) : (
        // If user is not logged in, render login button
        <>
          <p>Login to create your own posts.</p>
          <LoginButton />
        </>
      )}
    </section>
  );
}

export default CreatePost;
