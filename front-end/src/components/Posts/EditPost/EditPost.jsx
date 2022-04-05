import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "./EditPost.scss";
import LoginButton from "../../Button/LoginButton/LoginButton";
import ControlledRadioButtonsGroup from "../../Mui/Mui";
import "react-datepicker/dist/react-datepicker.css";
import ReactSelect from "react-select";
import ReactDatePicker from "react-datepicker";
const SERVER_URL = "http://localhost:8080";

function EditPost(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [payMethodvalue, setpayMethodValue] = useState("Non-Monetary Payment");
  const [monPayMethod, setMonPayMethod] = useState(true);
  // const [changeTypeState, setChangeTypeState] = useState(true)
  const [changeDateState, setChangeDateState] = useState(true);
  // const [changeWorkingHoursState, setchangeWorkingHoursState] = useState(true)

  const [getPost, setgetPost] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

  //login
  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //get post from API
  const fetchPostById = () => {
    const postID = props.match.params.postID;
    axios
      .get(`${SERVER_URL}/posts/${postID}`)
      .then((posts) => {
        setgetPost(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  useEffect(() => {
    if (getPost) {
      reset({
        title: getPost.title,
        content: getPost.content,
        salary: getPost.salary,
        salary_replacement: getPost.salary_replacement,
        // estimate_time: getPost.estimate_time,
      });
    }
  }, [getPost]);

  useEffect(() => {
    loginFunction();
    fetchPostById();
  }, []);

  const handlePostlUpdate = (data) => {
    const postID = props.match.params.postID;
    const newPostInfo = {
      title: data.title,
      content: data.content,
      status: data.status,

      requireDate: data.requireDate,
      salary: data.salary,
      salary_replacement: data.salary_replacement,
      // estimate_time: data.estimate_time,
    };
    axios
      .put(`${SERVER_URL}/posts/${postID}`, newPostInfo, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        props.history.push(`/post/${postID}`);
      })
      .catch((err) => console.log(err));
  };

  const handlePostlTypeUpdate = (data) => {
    const postID = props.match.params.postID;
    // estimate_time: data.estimate_time,
    axios
      .put(
        `${SERVER_URL}/posts/${postID}`,
        { type: data.type.value },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setUserInfo(userInfo);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setpayMethodValue(event.target.value);
  };
  return (
    <section className="EditPost">
      <h1>Edit Post</h1>
      {isLoggedIn && userInfo.id === getPost.user_id ? (
        <form
          className="EditPost__box"
          onSubmit={handleSubmit(handlePostlUpdate)}
        >
          <div className="EditPost__box--one">
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
          </div>
          <div className="EditPost__box--two">
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
            <section>
              <div className="subTitle">Require Date</div>
              {changeDateState ? (
                <>
                  <div onClick={(e) => setChangeDateState(false)}>
                    {getPost.requireDate}.
                  </div>
                  <div>Click me to edit the post type</div>
                </>
              ) : (
                <>
                  <Controller
                    control={control}
                    {...register("requireDate", {
                      required: "This is required.",
                    })}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="input"
                        placeholderText="Select date"
                        onChange={(e) => field.onChange(e)}
                        selected={field.value}
                      />
                    )}
                  />
                </>
              )}
              <p>{errors.type?.message}</p>
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
                      { value: "less than 30mins", label: "less than 5mins" },
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
            <input className="button" type="submit" />
          </div>
        </form>
      ) : (
        //  <form onSubmit={handleSubmit(handlePostlTypeUpdate)}>
        //      <section className="dropdown">
        //      <div>{getPost.type}</div>
        //     <div className="subTitle">Type</div>
        //     <Controller
        //        {...register("type", { required: "This is required." })}
        //       className="dropdowninside"
        //       control={control}
        //       render={({ field }) => (
        //         <ReactSelect
        //           isClearable
        //           {...field}
        //           options={[
        //             { value: "a", label: "a" },
        //             { value: "b", label: "b" },
        //             { value: "c", label: "c" },
        //             { value: "d", label: "d" },
        //             { value: "e", label: "e" },
        //             { value: "f", label: "f" },
        //           ]}
        //         />
        //       )}
        //     />
        //   {changeTypeState ? (
        //     <>
        //     <div onClick = {(e) => setChangeTypeState(false)}>{getPost.type}</div>
        //     <div>Click me to edit the post type</div>
        //     </>
        //     )
        //   :
        //   (
        //     <Controller
        //        {...register("type", { required: "This is required." })}
        //       className="dropdowninside"
        //       control={control}
        //       render={({ field }) => (
        //         <ReactSelect
        //           isClearable
        //           {...field}
        //           options={[
        //             { value: "a", label: "a" },
        //             { value: "b", label: "b" },
        //             { value: "c", label: "c" },
        //             { value: "d", label: "d" },
        //             { value: "e", label: "e" },
        //             { value: "f", label: "f" },
        //           ]}
        //         />
        //       )}
        //     />

        //   )}
        //      <p>{errors.type?.message}</p>
        //       <input className="button" type="submit" />
        //   </section>
        //   </form>
        // If user is not logged in, render login button
        <>
          <p>Login to create your own posts.</p>
          <LoginButton />
        </>
      )}
    </section>
  );
}

export default EditPost;
