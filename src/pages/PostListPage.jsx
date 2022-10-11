import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { SearchInput } from "../components/Elements";
import useFetchPostList from "../hooks/useFetchPostList";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import PostDetailsPage from "../pages/PostDetailsPage";
import JobService from "../services/JobService";
import { jobDetailsActions } from "../store/jobDetails-slice";
import { tagOptions } from "../utils/data";
import ApplyJobForm from "../components/ApplyJobForm";
import PopUp from "../layout/PopUp";

const PAGE_SIZES = [2, 15, 25, 50, 100];

const PostListPage = () => {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const { jobInfo, jobID, suceess } = useSelector((state) => state.jobDetails);
  const { showJobPicture, showJobApply } = useSelector((state) => state.popUp);
  const [currentPage, useCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZES[0]);
  const [selectedJobList, setSelectedJobList] = useState([]);
  const { data, loading, error, total } = useFetchPostList();
  const [searchValue, setSearchValue] = useState({
    title: "",
    tag: "",
    location: "",
  });
  const updateRowsPerPage = (currentPageSize) => {
    setCurrentPageSize(currentPageSize);
    useCurrentPage(1);
  };

  const updatePage = (currentpage) => {
    useCurrentPage(currentpage);
  };

  const updateJobDetails = async (jobID) => {
    try {
      const data = await JobService.getJobDetails(jobID);
      if (data) {
        dispatch(jobDetailsActions.getJobDetails(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Village | Jobs";
    const indexOfLastJob = currentPage * currentPageSize;
    const indexOfFirstJob = indexOfLastJob - currentPageSize;
    const selectData = data.slice(indexOfFirstJob, indexOfLastJob);
    setSelectedJobList(selectData);
  }, [currentPage, currentPageSize, data]);

  useEffect(() => {
    updateJobDetails(jobID);
  }, [jobID]);

  return (
    <div>
      <div className="flex flex-row w-full items-center">
        <SearchInput
          label="Search by Title"
          //  icon,
          type="text"
          id="searchByTitle"
          handleOnChange={(e) =>
            setSearchValue((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <SearchInput
          label="Search by Location"
          //  icon,
          type="text"
          id="searchByLocation"
          handleOnChange={(e) =>
            setSearchValue((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={tagOptions[4].value}
          isMulti
          options={tagOptions}
        />
      </div>

      <div className="flex justify-start px-2">{total} jobs</div>
      {loading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <div className="flex flex-row justify-between m-2 ">
          <div className="h-screen border overflow-auto flex flex-col items-center w-1/3">
            <PostList
              selectedJobList={selectedJobList}
              searchValue={searchValue}
            />
            {error !== null && <div>null</div>}
            <Pagination
              currentPage={currentPage}
              totalCount={total}
              pageSize={currentPageSize}
              pageSizeOptions={PAGE_SIZES}
              onPageChange={updatePage}
              onPageSizeOptionChange={updateRowsPerPage}
            />
          </div>

          <div className="hidden md:block md:w-2/3 md:border md:ml-2 md:h-screen overflow-auto">
            <PostDetailsPage />
          </div>
          {showJobPicture && (
            <PopUp
              target="showJobPicture"
              children={
                <img
                  className="w-80"
                  src={jobInfo.jobImageUrl}
                  alt={jobInfo.title}
                />
              }
            />
          )}
          {showJobApply && (
            <PopUp target="showJobApply" children={<ApplyJobForm />} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostListPage;
