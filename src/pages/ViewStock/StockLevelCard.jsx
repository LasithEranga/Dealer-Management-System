import _ from "lodash";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import StockLevelLine from "../../components/StockLevelLine/StockLevelLine";

const StockLevelCard = ({ title, data }) => {
  console.log(data);
  return (
    <ContentCard>
      <div>{title}</div>
      {Object.keys(data).map((oneEl, index) => (
        <StockLevelLine
          key={index}
          fillColor={`rgba( ${
            oneEl.length * 3 > 255 ? 125 : oneEl.length * 3
          }, ${oneEl.length * 25 > 255 ? 125 : oneEl.length * 25}, ${
            oneEl.length * 50 > 255 ? 125 : oneEl.length * 50
          }, 1)`}
          hundredPercentValue={data[oneEl].hundredPercentValue}
          currentValue={data[oneEl].currentValue}
          title={`${_.capitalize(oneEl)} tanks`}
        />
      ))}
    </ContentCard>
  );
};

export default StockLevelCard;
