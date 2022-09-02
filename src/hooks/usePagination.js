
import { useEffect, useState } from "react";

export const DOTS = "...";

const usePagination = (currentPage, totalCount, pageSize) => {

  const [page, setPage] = useState([])

  const MaxPage = Math.ceil(totalCount / pageSize)

  const handlePageArray = () => {
    const array = Array.from({ length: MaxPage }, (x, i) => i + 1)

    let selectedArray = array.slice(0, 5)

    if (currentPage > 3) {
      selectedArray = array.slice(currentPage - 3, currentPage + 2)
    }
    if (MaxPage - currentPage < 3) {
      selectedArray = array.slice(MaxPage - 5, MaxPage)
    }
    return selectedArray

  }

  useEffect(() => {
    const pageArray = handlePageArray()
    setPage(pageArray)
  }, [currentPage, pageSize, totalCount])

  return { page, MaxPage };

}

export default usePagination;
