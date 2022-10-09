import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { LoginButton, BasicInput, Button } from "../components/Elements";
import UploadPicture from "../components/Users/UploadPicture";

const CreatePostPage = () => {
  const [payMethodvalue, setpayMethodValue] = useState("Non-Monetary Payment");
  const [monPayMethod, setMonPayMethod] = useState(true);
  const [pictureUrl, setpictureUrl] = useState("");
  const [jobInfo, setJobInfo] = useState({
    title: "",
    content: "",
    status: "open to apply",
    type: "",
    salary: "",
    requireDate: "",
    estimate_time: "",
    salary_replacement: "",
    picture_Details: "",
  });
  const [controllForm, setControllForm] = useState({
    title: { error: false, touched: false, errorMessage: "" },
    type: { error: false, touched: false, errorMessage: "" },
    requireDate: { error: false, touched: false, errorMessage: "" },
  });
  const { userInfo, isLoggedIn } = useSelector((state) => state.login);

  const MonPayMethodFunction = () => {
    if (payMethodvalue === "Money") {
      setMonPayMethod(false);
    } else setMonPayMethod(true);
  };

  useEffect(() => {
    MonPayMethodFunction();
    document.title = "Upload Post";
  }, [payMethodvalue]);

  // const handleChange = (event) => {
  //   setpayMethodValue(event.target.value);
  // };

  const handleChange = (e, key, func) => {
    const [value] = func;
    if (value) {
      setControllForm((prev) => ({
        ...prev,
        [`${key}`]: { error: false, touched: false, errorMessage: "" },
      }));
    }
    setValue((prev) => ({
      ...prev,
      [`${key}`]: e.target.value,
    }));
  };

  const handlePictureUrl = (url) => {
    setpictureUrl((jobInfo.url = url));
  };

  const handleFormSubmit = (data) => {
    axios
      .post(`${SERVER_URL}/posts`, {
        userId: user.id,
        picture_Details: pictureUrl,
        title: data.title,
        content: data.content,
        status: data.status,
        type: data.type.value,
        requireDate: data.requireDate,
        salary: data.salary,
        salary_replacement: data.salary_replacement,
        estimate_time: data.estimate_time.value,
      })
      .then((data) => {
        console.log(data);
        history.push(`/`);
      })
      .catch((err) => {
        console.log("Error creating a new post:", err);
      });
  };

  return (
    <section className="m-4">
      {isLoggedIn ? (
        <>
          <div className="text-2xl">Create a New Post</div>
          <UploadPicture
            icon={null}
            action={handlePictureUrl}
            image="Picture"
            username="Dummy Picture"
          />
          <BasicInput
            type="text"
            id="title"
            label="*Title"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error={controllForm.title}
            handleOnChange={(e) =>
              handleChange(e, "title", isValidPassword(e.target.value))
            }
            handleOnBlur={(e) =>
              handleError("title", isValidPassword(e.target.value))
            }
          />
          <BasicInput
            type="text"
            id="content"
            label="Content"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error={controllForm.content}
            handleOnChange={(e) =>
              handleChange(e, "title", isValidPassword(e.target.value))
            }
            handleOnBlur={(e) =>
              handleError("title", isValidPassword(e.target.value))
            }
          />

          <BasicInput
            type="text"
            id="title"
            label="*Title"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error={controllForm.title}
            handleOnChange={(e) =>
              handleChange(e, "title", isValidPassword(e.target.value))
            }
            handleOnBlur={(e) =>
              handleError("title", isValidPassword(e.target.value))
            }
          />
          <BasicInput
            type="text"
            id="title"
            label="*Title"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error={controllForm.title}
            handleOnChange={(e) =>
              handleChange(e, "title", isValidPassword(e.target.value))
            }
            handleOnBlur={(e) =>
              handleError("title", isValidPassword(e.target.value))
            }
          />
          <BasicInput
            type="text"
            id="title"
            label="*Title"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error={controllForm.title}
            handleOnChange={(e) =>
              handleChange(e, "title", isValidPassword(e.target.value))
            }
            handleOnBlur={(e) =>
              handleError("title", isValidPassword(e.target.value))
            }
          />
          <Button
            action="Submit"
            handleAction={handleFormSubmit}
            disable="false"
          />
        </>
      ) : (
        <>
          <p>Pleas login to create your own posts.</p>
          <LoginButton />
        </>
      )}
      {/* {user ? (
        <>
          <h1 className="pageheader">Create New Post</h1>
          <div className="createPageForm">
            <form className="createPageForm__Upload" onSubmit={formHandler}>
              <h3>Upload Photo First</h3>
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
              <div className="createPageForm__Upload--photo">
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
              <div className="createPostButton">
                <button className="noStyle" type="submit">
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                  </Button>
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        // If user is not logged in, render login button
     
      )} */}
    </section>
  );
};

export default CreatePostPage;
