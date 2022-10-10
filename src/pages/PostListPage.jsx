import { useState, useEffect } from "react";

import useFetchPostList from "../hooks/useFetchPostList";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import PostDetailsPage from "../pages/PostDetailsPage";
const PAGE_SIZES = [2, 15, 25, 50, 100];

const PostListPage = () => {
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

  useEffect(() => {
    document.title = "Village | Jobs";
    const indexOfLastJob = currentPage * currentPageSize;
    const indexOfFirstJob = indexOfLastJob - currentPageSize;
    const selectData = data.slice(indexOfFirstJob, indexOfLastJob);
    setSelectedJobList(selectData);
  }, [currentPage, currentPageSize, data]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <input
            className="bg-stone-200 m-2 p-2"
            type="text"
            placeholder="Search by Title"
            onChange={(e) =>
              setSearchValue((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            className="bg-stone-200 m-2 p-2"
            type="text"
            placeholder="Search by Location"
            onChange={(e) =>
              setSearchValue((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
        <input
          className="bg-stone-200 m-2 pb-10 pl-4"
          type="text"
          placeholder="Search by Tag"
          onChange={(e) =>
            setSearchValue((prev) => ({ ...prev, tag: e.target.value }))
          }
        />
      </div>
      <div>Filters</div>

      <div className="flex justify-end px-2">{total} jobs</div>
      {loading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <div className="flex flex-row justify-between w-full m-4">
          <div className="md:w-1/3">
            <div className="h-full border overflow-auto flex flex-col items-center">
              <PostList
                selectedJobList={selectedJobList}
                searchValue={searchValue}
              />
            </div>
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
          <div className="hidden md:block md:h-80 md:w-2/3 md:border md:ml-2">
            <PostDetailsPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostListPage;
