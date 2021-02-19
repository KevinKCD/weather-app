import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";

const TempCard = ({
  indexNum,
  hour,
  timeDifference,
  currentHour,
  oneCallDataFromApi,
  kelvinToCelcius,
  differenceFrom12AM,
  tomorrow,
}) => {
  // map every weather attribute in api
  var weatherAttributeForCard =
    oneCallDataFromApi && oneCallDataFromApi.hourly[indexNum].weather[0].main;

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            if (currentHour + indexNum + timeDifference > 23) {
              currentHour = currentHour + indexNum + timeDifference - 24;
            } else if (currentHour + indexNum + timeDifference < 0) {
              currentHour = currentHour + indexNum + timeDifference + 24;
            } else {
              currentHour = currentHour + indexNum;
            }
            return indexNum === 0 ? <b>Now</b> : <b>{currentHour}</b>;
          case true:
            return <b>{currentHour + indexNum + differenceFrom12AM - 24}</b>; // Returning 12am onwards
          default:
            return "N/A Times";
        }
      })()}

      <div className={`tile-border${indexNum === 0 ? "-now" : ""}`}>
        <div className="card">
          <div className="center">
            {(() => {
              switch (weatherAttributeForCard) {
                case "Clouds":
                  return (
                    <div className="padding-bottom">
                      <AiFillCloud
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Rain":
                  return (
                    <div className="padding">
                      <IoRainy
                        size={38}
                        padding="15px"
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Snow":
                  return (
                    <div className="padding-bottom">
                      <BiCloudSnow
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Clear":
                  return (
                    <div className="padding-bottom">
                      <TiWeatherSunny
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
              }
            })()}
          </div>
        </div>
        <div className="center">
          <b>
            {`${kelvinToCelcius(
              //Change key to be unique
              hour.temp
            )}°C`}
          </b>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
