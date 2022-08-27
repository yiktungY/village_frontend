
import { useEffect, useState } from "react";

export const DOTS = "...";

const usePagination = (currentPage, totalCount, pageSize) => {

  const [page, setPage] = useState([])

  const MaxPage = Math.ceil(totalCount / pageSize)

  const handlePageArray = () => {
    const array = Array.from({ length: MaxPage }, (x, i) => i + 1)

    if (array.length < 5) {
      return array
    }
    else if (array.length - currentPage < 2 || currentPage < 3) {
      const newArray = []
      for (let i = 0; i < array.length; i++) {
        if (array[i] === 1 || array[i] === array.length) {
          newArray.push(array[i])
        }
        else if (array[i] - currentPage > 2 || currentPage - array[i] > 2) {
          const dots = newArray.find(dots => dots === DOTS)
          !dots && newArray.push(DOTS)
        }
        else {
          newArray.push(array[i])
        }
      }
      return newArray
    }
    else {
      return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, array.length]
    }
  }

  useEffect(() => {
    const pageArray = handlePageArray()
    setPage(pageArray)
  }, [currentPage, pageSize, totalCount])

  return { page, MaxPage };

}

export default usePagination;
