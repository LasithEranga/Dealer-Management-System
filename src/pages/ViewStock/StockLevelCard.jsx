import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import StockLevelLine from "../../components/StockLevelLine/StockLevelLine";

const StockLevelCard = ({ title }) => {
  return (
    <ContentCard>
      <div className={` fs-6 fw-bold`}>{title}</div>
      <StockLevelLine
        fillColor="red"
        count={10}
        title="New Tanks"
        filled={20}
      />
      <StockLevelLine
        fillColor="#1D9D62"
        count={60}
        title="Empty Tanks"
        filled={60}
      />
      <StockLevelLine
        fillColor="#FDEA3B"
        count={40}
        title="Refilled Tanks"
        filled={40}
      />
      <StockLevelLine
        fillColor="#248DDB"
        count={50}
        title="Returned Tanks"
        filled={50}
      />
    </ContentCard>
  );
};

export default StockLevelCard;
