import { useState } from "react";

const useTable = (rows, filterBy, rowsPerPage) => {
  const [currentPage, setCurrentPage] = useState();
  const [filteredData, setFilteredData] = useState();

  const prevPageBtnAction = () => {};
  const nextPageBtnAction = () => {};
};
export default useTable;
