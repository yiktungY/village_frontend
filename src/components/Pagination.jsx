import usePagination, { DOTS } from "../hooks/usePagination";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  pageSize,
  pageSizeOptions,
}) => {
  const paginationRange = usePagination(currentPage, totalCount, pageSize);

  const onNext = () => {
    const updatedPage = currentPage + 1;
    onPageChange(updatedPage);
  };

  const onPrevious = () => {
    const updatedPage = currentPage - 1;
    onPageChange(updatedPage);
  };

  return (
    <div className="flex flex-row w-full h-10 justify-center items-center">
      {currentPage === 1 ? (
        <BiChevronLeft className="text-lg" />
      ) : (
        <BiChevronLeft onClick={onPrevious} className="" />
      )}

      {paginationRange.page.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div key={index} className="">
              &#8230;
            </div>
          );
        }
        return (
          <div
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className=""
          >
            {pageNumber}
          </div>
        );
      })}

      {currentPage === paginationRange.MaxPage ? (
        <BiChevronRight className="text-lg" />
      ) : (
        <BiChevronRight onClick={onNext} className="" />
      )}
      <select
        className=""
        defaultValue={pageSize}
        onChange={(e) => {
          onPageSizeOptionChange(e.target.value);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
