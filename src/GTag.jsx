import React, { useEffect } from "react";
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-LKCWQKTT4F";
const IS_DEV = import.meta.env.MODE === "development";

const trackMeditation = (duration) => {
  console.log('logging meditation')
  if (IS_DEV) {
    console.log('skipping GA')
    return;
  }
  ReactGA.event("meditation", {
    value: duration,
    unit: "seconds",
  });
};

function GTag() {
  useEffect(() => {
    if (IS_DEV) {

    console.log('skipping GA')
    return;
    }
    ReactGA.initialize(GA_TRACKING_ID);
  }, []);
  return <></>;
}

export { trackMeditation };
export default GTag;
