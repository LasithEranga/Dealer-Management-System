import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import ContentCard from "../../components/ContentCard/ContentCard";
import StockLevelLine from "../../components/StockLevelLine/StockLevelLine";
import { getColorFromName } from "../../utils/getColorFromName";

const StockLevelCard = ({ title, data }) => {
  const { tankTypeColors } = useSelector((state) => state.chartColorsDMS);

  console.log(data);
  return (
    <ContentCard>
      <div>{title}</div>
      {Object.keys(data).map((oneEl, index) => (
        <StockLevelLine
          key={index}
          fillColor={tankTypeColors[oneEl]}
          hundredPercentValue={data[oneEl].hundredPercentValue}
          currentValue={data[oneEl].currentValue}
          title={`${_.capitalize(oneEl)} tanks`}
        />
      ))}
    </ContentCard>
  );
};

export default StockLevelCard;
