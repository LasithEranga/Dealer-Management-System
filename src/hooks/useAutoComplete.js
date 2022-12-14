import { useEffect, useState } from "react";

export default function useAutoComplete(searchFunc = () => {}, body = {}) {
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState("");
  const [suggestedList, setSuggestedList] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (keyword === "") {
      setSuggestedList([]);
      return;
    }
    if (keyword !== searched) {
      searchFunc({ keyword, ...body }, (response) => {
        setSuggestedList(response.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return [
    keyword,
    setKeyword,
    suggestedList,
    setSuggestedList,
    selected,
    setSelected,
    setSearched,
  ];
}
