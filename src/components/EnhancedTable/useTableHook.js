import { useState } from "react";

const useTableHook = (rows, filterBy, rowsPerPage) => {
  const [currentPage, setCurrentPage] = useState();
  const [filteredData, setFilteredData] = useState();

  const prevPageBtnAction = () => {};
  const nextPageBtnAction = () => {};
};
export default useTableHook;
