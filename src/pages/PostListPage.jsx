import { useState, useEffect } from "react";

import useFetchPostList from "../hooks/useFetchPostList";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import Post from "../components/Post";

const PAGE_SIZES = [1, 15, 25, 50, 100];

const PostListPage = () => {
  const [currentPage, useCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZES[0]);
  const [selectedJobList, setSelectedJobList] = useState([]);
  const { data, loading, error, total } = useFetchPostList();

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
      <input className="bg-stone-200" placeholder="Search by Name" />
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
        selectedJobList.map((post) => <Post key={post.post_id} {...post} />)
      )}
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
  );
};

export default PostListPage;
