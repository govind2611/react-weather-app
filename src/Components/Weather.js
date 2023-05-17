import React, { useState } from "react";

const Weather = () => {
  const [cords, setCords] = useState({ latitude: "", longitude: "" });
  const [hemisphere, setHemisphere] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [showCoordinates, setShowCoordinates] = useState(false); // State variable to track button click
  const [showButton, setShowButton] = useState(true); // State variable to track whether data has been fetched or not

  let monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let { latitude, longitude } = cords;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setCords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        hemi(position.coords.latitude);
        setShowCoordinates(true); // Set the state to true after clicking the button
        setShowButton(false); // Hide the button after getting the data
      });
    }
  }

  function hemi(latitude) {
    if (latitude > 0) {
      setHemisphere("Northern Hemisphere");
    } else if (latitude < 0) {
      setHemisphere("Southern Hemisphere");
    } else if (latitude === 0) {
      setHemisphere("Equator");
    }
  }

  const isChilly =
    (hemisphere === "Northern Hemisphere" && (month >= 9 || month <= 2)) ||
    (hemisphere === "Southern Hemisphere" && month >= 3 && month <= 8);

  const isBeachTime =
    (hemisphere === "Northern Hemisphere" && month >= 3 && month <= 8) ||
    (hemisphere === "Southern Hemisphere" && (month >= 9 || month <= 2));

  return (
    <div className="container">
      <div className="msg">
        {isChilly && <h1>Ohooo, it's chilly!</h1>}
        {isBeachTime && <h1>Let's heat the beach!</h1>}
      </div>

      <div className="lat-long">
        {showCoordinates && (
          <>
            <h2>Latitude: {cords.latitude}</h2>
            <h2>Longitude: {cords.longitude}</h2>
          </>
        )}
      </div>

      {showCoordinates && (
        <div className="data">
          <h2>{hemisphere}</h2>
          <h2>Month : {monthArr[month]}</h2>
        </div>
      )}

      {showButton && ( // Render the button only if showButton is true
        <div className="btn">
          <h1>Click the button to get the Users information</h1>
          <button onClick={getLocation}>Get Location</button>
        </div>
      )}
    </div>
  );
};

export default Weather;
