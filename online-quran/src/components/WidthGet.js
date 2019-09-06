import React, { useEffect, useState } from "react";
import Menu from "./Menu";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const HomeComponent = () => {
  const { width } = useWindowDimensions();

  return (
    <div>
      <Menu size={width} />
    </div>
  );
};
export default HomeComponent;
