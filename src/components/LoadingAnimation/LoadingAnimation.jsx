import React from "react";
import { BarWave, FillingBottle, Hypnosis } from "react-cssfx-loading";

const LoadingAnimation = () => {
  const size = "80px";
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 8000,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backdropFilter: "blur(2px)",
      }}
    >
      <FillingBottle
        color="#007ACC"
        style={{
          opacity: 1,
        }}
        width={size}
        height={size}
        duration="2s"
      />
    </div>
  );
};

export default LoadingAnimation;
