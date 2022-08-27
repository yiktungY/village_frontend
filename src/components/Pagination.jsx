import usePagination, { DOTS } from "../hooks/usePagination";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDotsHorizontalRounded,
} from "react-icons/bi";

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
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-center">
        {currentPage === 1 ? (
          <BiChevronLeft className="w-8 h-8 flex justify-center items-center text-xl rounded-full m-2 text-stone-300" />
        ) : (
          <BiChevronLeft
            onClick={onPrevious}
            className="w-8 h-8 flex justify-center items-center text-xl rounded-full m-2 hover:bg-stone-100"
          />
        )}

        {paginationRange.page.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <BiDotsHorizontalRounded key={index} className="text-xl" />;
          } else if (pageNumber === currentPage) {
            return (
              <div
                key={index}
                onClick={() => onPageChange(pageNumber)}
                className="w-8 h-8 flex justify-center items-center text-xl bg-sky-500 rounded-full text-white m-2"
              >
                {pageNumber}
              </div>
            );
          }
          return (
            <div
              key={index}
              onClick={() => onPageChange(pageNumber)}
              className="w-8 h-8 flex justify-center items-center text-xl rounded-full m-2 hover:bg-stone-100"
            >
              {pageNumber}
            </div>
          );
        })}

        {currentPage === paginationRange.MaxPage ? (
          <BiChevronRight className="w-8 h-8 flex justify-center items-center text-xl rounded-full m-2 text-stone-300" />
        ) : (
          <BiChevronRight
            onClick={onNext}
            className="w-8 h-8 flex justify-center items-center text-xl rounded-full m-2 hover:bg-stone-100"
          />
        )}
      </div>
      <select
        className="m-2 px-4 py-2 w-2/4 bg-stone-200 rounded-lg"
        defaultValue={pageSize}
        onChange={(e) => {
          onPageSizeOptionChange(+e.target.value);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
      <div className="text-stone-400 tracking-wider">
        Page {currentPage} of {paginationRange.MaxPage}
      </div>
    </div>
  );
};

export default Pagination;
