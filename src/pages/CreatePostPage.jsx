import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { LoginButton, Button, SubTitle } from "../components/Elements";
import UploadPicture from "../components/Users/UploadPicture";
import CountrySelect from "../components/Users/CountrySelect";
import { tagOptions, hourOptions } from "../utils/data";
import JobService from "../services/JobService";
import { noticiationActions } from "../store/noticiation-slice";

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
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
    location: "",
  });
  const [deliverWay, setDeliverWay] = useState("");
  const [location, setLocation] = useState({
    country: null,
    state: null,
    city: null,
  });
  const { userInfo, isLoggedIn } = useSelector((state) => state.login);

  const handlePictureUrl = (url) => {
    setJobInfo((prev) => ({ ...prev, picture_Details: url }));
  };
  const handleTag = (e) => {
    const tags = e.map((tag) => tag.value).join(",");
    setJobInfo((prev) => ({ ...prev, type: tags }));
  };

  const handleFormSubmit = async () => {
    try {
      const submitInfo = { ...jobInfo, userId: userInfo.id };
      const data = await JobService.creatJob(submitInfo);
      console.log("====database=====");
      console.log(data);
      if (data.status === 201) {
        dispatch(
          noticiationActions.showMessage(
            `${jobInfo.title} Updated successfully!`
          )
        );
      }
    } catch (error) {
      dispatch(noticiationActions.showMessage({ error }));
    }
  };
  useEffect(() => {
    const address = [
      location.country?.name,
      location.state?.name,
      location.city?.name,
    ].join(",");

    setJobInfo((prev) => ({ ...prev, location: address }));
  }, [location]);

  useEffect(() => {
    document.title = "Upload Post";
  }, []);

  return (
    <section className="m-4">
      {isLoggedIn ? (
        <>
          <div className="text-2xl">Create a New Post</div>
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex flex-col w-full md:w-1/2 m-4">
              <input
                type="text"
                className=" px-2.5 pb-2.5 mb-4 pt-4 w-full text-black text-xl bg-gray-600 rounded-lg border appearance-none  focus:outline-none focus:ring-0 peer "
                placeholder="Title"
                value={jobInfo.title}
                onChange={(e) =>
                  setJobInfo((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <textarea
                id="content"
                rows="10"
                className="block p-2.5 w-full mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border  "
                value={jobInfo.content}
                onChange={(e) =>
                  setJobInfo((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Job details, requirement..."
              />
              <div className="w-full">
                <UploadPicture
                  icon={null}
                  action={handlePictureUrl}
                  image="Picture"
                  username="Dummy Picture"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between w-full md:w-1/2 m-4 h-90 ">
              <div>
                <SubTitle children={"Payment"} />
                <input
                  type="text"
                  className="px-2.5 pb-2.5 mb-4 pt-4 w-full text-black text-sm rounded-lg border appearance-none  "
                  placeholder="10 cad - 20 cad"
                  value={jobInfo.salary}
                  onChange={(e) =>
                    setJobInfo((prev) => ({ ...prev, salary: e.target.value }))
                  }
                />
              </div>
              <div>
                <SubTitle children={"Choose TAGs"} />
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={tagOptions[4].value}
                  isMulti
                  options={tagOptions}
                  onChange={handleTag}
                />
              </div>
              <div>
                <SubTitle children={"Date"} />
                <DatePicker
                  className="px-2.5 pb-2.5 mb-4 pt-4 w-full text-black text-sm rounded-lg border appearance-none "
                  selected={jobInfo.requireDate || new Date()}
                  onChange={(data) =>
                    setJobInfo((prev) => ({ ...prev, requireDate: data }))
                  }
                />
              </div>
              <div>
                <SubTitle children={"Estimate Hour"} />
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={hourOptions[0].value}
                  options={hourOptions}
                  onChange={(time) =>
                    setJobInfo((prev) => ({
                      ...prev,
                      estimate_time: time.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-row items-center m-4">
                <input
                  id="inPerson"
                  type="radio"
                  value="inPerson"
                  name="deliverMethod"
                  onClick={(e) => setDeliverWay(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label
                  htmlFor="inPerson"
                  className="ml-2 text-sm mr-4 font-medium text-gray-900 "
                >
                  In Person
                </label>
                <input
                  id="online"
                  type="radio"
                  value="online"
                  name="deliverMethod"
                  onClick={(e) => setDeliverWay(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                />
                <label
                  htmlFor="online"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Online
                </label>
              </div>
              {deliverWay === "inPerson" && (
                <CountrySelect
                  setSelectedOption={setLocation}
                  selectedOption={location}
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              action="Post"
              handleAction={handleFormSubmit}
              disable="false"
            />
          </div>
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
