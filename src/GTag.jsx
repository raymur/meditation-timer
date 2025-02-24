import React, { useEffect } from "react";
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-LKCWQKTT4F";
const IS_DEV = process.env.NODE_ENV === "development";

const trackMeditation = (duration) => {
  if (IS_DEV) return;
  ReactGA.event("meditation", {
    value: duration,
    unit: "seconds",
  });
};

function GTag() {
  useEffect(() => {
    if (IS_DEV) return;
    ReactGA.initialize(GA_TRACKING_ID);
  }, []);
  return <></>;
}

export { trackMeditation };
export default GTag;
