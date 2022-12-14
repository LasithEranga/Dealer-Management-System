import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { searchGasStock } from "../app/api/gasStockServices";
import StyledAutoComplete from "../components/StyledAutoComplete/StyledAutoComplete";
import useAutoComplete from "../hooks/useAutoComplete";

const Test = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [
    keyword,
    setKeyword,
    suggestedList,
    setSuggestedList,
    selected,
    setSelected,
    setSearched,
  ] = useAutoComplete(searchGasStock, { userId });

  useEffect(() => {
    if (selected.name) {
      setKeyword(selected.name + " " + selected.gasTankType);
      setSearched(selected.name + " " + selected.gasTankType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <StyledAutoComplete
        title={"Test search"}
        placeholder="Search Dealer"
        suggestedList={suggestedList}
        setSuggestedList={setSuggestedList}
        setSelected={setSelected}
        suggessionName={"Suggested Dealers"}
        madeOf={["name", "gasTankType"]}
        keyword={keyword}
        setKeyword={setKeyword}
      />
    </div>
  );
};

export default Test;
