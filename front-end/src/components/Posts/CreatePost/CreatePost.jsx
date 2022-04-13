import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useLogin from "../../../hooks/useLogin";
import axios from "axios";
import "./CreatePost.scss";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import ControlledRadioButtonsGroup from "../../Mui/Mui";
import LoginButton from "../../Button/LoginButton/LoginButton";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/firebase";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const SERVER_URL = "http://localhost:8080";

function CreatePost(props) {
  const { userInfo, isLoggedIn } = useLogin();
  const [payMethodvalue, setpayMethodValue] = useState("Non-Monetary Payment");
  const [monPayMethod, setMonPayMethod] = useState(true);
  const [pictureUrl, setpictureUrl] = useState("");
  const [progress, setProgress] = useState(0);

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


  const MonPayMethodFunction = () => {
    if (payMethodvalue === "Money") {
      setMonPayMethod(false);
    } else setMonPayMethod(true);
  };

  useEffect(() => {

    MonPayMethodFunction();
    document.title = "Upload Post";
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
        props.history.push(`/`);
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
          <h1 className="headline">Create New Post</h1>
          <div className="createPageForm">
            <form className="createPageForm__Upload" onSubmit={formHandler}>
              <h2>Upload Photo</h2>
              <input
                className="noStyle createPageForm__Upload--button"
                type="file"
              />
              <button
                type="submit"
                className="noStyle createPageForm__Upload--button"
              >
                <Button variant="contained">Upload</Button>
              </button>
            </form>
            {progress ? (
              <div className="regform__photo">
                <img className="profilePicture" src={pictureUrl} alt="icon" />
                <h3>Uploaded {progress} %</h3>
              </div>
            ) : (
              <div className="picture-replace"></div>
            )}
          </div>
          <form
            className="createPostTwo"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="createPostTwo__textInfo">
              <div className="subTitle">TITLE: </div>
              <input
                className="inputStyle"
                {...register("title", { required: "This is required." })}
                placeholder="something like: Looking for a dog walker"
              />
              <p className="errorMessage">{errors.title?.message}</p>
              <div className="subTitle">DETAIlS: </div>
              <input
                className="inputStyleBig"
                {...register("content", { required: "This is required." })}
                placeholder="I need a dog walker"
              />
              <p className="errorMessage">{errors.content?.message}</p>
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
                        { value: "Accounting", label: "Accounting" },
                        { value: "Babysitting", label: "Babysitting" },
                        { value: "Cook", label: "Cook" },
                        { value: "Housekeeping", label: "Housekeeping" },
                        {
                          value: "Design/ video editing",
                          label: "Design/ video editing",
                        },
                        { value: "Gardening", label: "Gardening" },
                        { value: "dog walking", label: "dog walking" },
                        { value: "technician jobs", label: "technician jobs" },
                        { value: "house moving", label: "house moving" },
                      ]}
                    />
                  )}
                />
              </section>
            </div>
            <div className="createPostTwo__otherInfo">
              <div className="createPostTwo__otherInfo--payment">
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
                      className="inputStyle"
                      {...register("salary_replacement", {
                        required: "This is required.",
                      })}
                      placeholder="a dozen of beer"
                    />
                    <p className="errorMessage">
                      {errors.salary_replacement?.message}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="subTitle">
                      Show a range you would like to offer:{" "}
                    </div>
                    <input
                      className="inputStyle"
                      {...register("salary", { required: "This is required." })}
                      placeholder="CA$20 - CA$25  per hour"
                    />
                    <p className="errorMessage">{errors.salary?.message}</p>
                  </div>
                )}
              </div>
              <div className="createPostTwo__otherInfo--other">
                <section>
                  <div className="subTitle">Require Date</div>
                  <Controller
                    control={control}
                    name="requireDate"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="inputStyle"
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
              <button className="noStyle createPostButton" type="submit">
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
              </button>
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
