import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import "./index.css";

const StyledBox = styled(Box)`
  ${({ theme }) => `
  transition: ${theme.transitions.create(["all", "transform"], {
    duration: theme.transitions.duration.simple,
  })};
  `}
`;
const StyledAutoComplete = ({
  suggestedList,
  title,
  keyword,
  setKeyword,
  suggessionName,
  setSuggestedList,
  setSelected,
  register,
  errors,
}) => {
  return (
    <Box>
      <Typography sx={{ mb: 1, mt: 3 }}>{title}</Typography>
      <Box sx={{ position: "relative" }}>
        <TextField
          size="small"
          fullWidth
          value={keyword ? keyword : ""}
          {...register}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          {...(errors.name && {
            error: true,
            helperText: errors.name.message,
          })}
        />
        <StyledBox
          sx={{
            position: "absolute",
            height:
              suggestedList.length === 0
                ? "0rem"
                : `${suggestedList.slice(0, 5).length * 2 + 3}rem`,
            overflow: "hidden",
            zIndex: 2,
            flexDirection: "column",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 1,

            borderLeft:
              suggestedList.length === 0 ? "none" : "1px solid #6ECCAF ",
            borderBottom:
              suggestedList.length === 0 ? "none" : "1px solid #6ECCAF ",
            borderRight:
              suggestedList.length === 0 ? "none" : "1px solid #6ECCAF ",
            top: 36.5,
            p: suggestedList.length === 0 ? 0 : 1,
          }}
        >
          <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
            {suggessionName}
          </Typography>
          {suggestedList.slice(0, 5).map((oneEl, index) => {
            return (
              <div
                key={index}
                className="list-item"
                onClick={() => {
                  setSelected(oneEl);
                  setSuggestedList([]);
                }}
              >
                {Object.values(oneEl)[1]} {Object.values(oneEl)[3]}
              </div>
            );
          })}
        </StyledBox>
      </Box>
    </Box>
  );
};

export default StyledAutoComplete;
