import React, { useState, useEffect } from "react";
import d2d from "degrees-to-direction";

function MainComponent(props) {
  const { weather, main, location, country, icon } = props;

  var iconStyle = {
    width: "100px",
    height: "100px",
    backgroundImage: `url(http://openweathermap.org/img/wn/${icon}@2x.png)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="main__container">
      <div className="Location__container">
        <h2>{location}</h2>
        <h3>{country}</h3>
      </div>
      <div className="weather__container">
        <div className="weather__icon" style={iconStyle}></div>
        <h3>
          {weather.description} {main.temp}°C
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <p>Low {main.temp_min}°C</p>
          <p>High {main.temp_max}°C</p>
        </div>
        <p>Feels {main.feels_like}°C</p>
      </div>
    </div>
  );
}
export default MainComponent;

export function ExtraComponent(props) {
  const { data } = props;
  return (
    <div className="container">
      <h2>Extras</h2>
      <ul className="extras__grid_body">
        <li className="list__item">
          <p style={{ fontSize: "16px" }}>{data.main.pressure}</p>
          <p className="overflow_stop">Pressure</p>
        </li>
        <li className="list__item">
          <p style={{ fontSize: "16px" }}>{data.main.humidity}%</p>
          <p className="overflow_stop">Humidity</p>
        </li>
        {data.wind && (
          <li className="list__item">
            <p style={{ fontSize: "16px" }}>{data.wind.speed}m/s</p>
            <p style={{ fontSize: "8px" }}>{d2d(data.wind.deg)}</p>
            <p className="overflow_stop">Wind speed</p>
          </li>
        )}
        {data.rain && (
          <li className="list__item">
            <p style={{ fontSize: "16px" }}>N/A</p>
            <p className="overflow_stop">Rain</p>
          </li>
        )}
        {data.snow && (
          <li className="list__item">
            <p style={{ fontSize: "16px" }}>N/A</p>
            <p className="overflow_stop">snow</p>
          </li>
        )}
        {data.clouds && (
          <li className="list__item">
            <p style={{ fontSize: "16px" }}>{data.clouds.all}%</p>
            <p className="overflow_stop">Cloudiness</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export function UVComponent(props) {
  const [color, setColor] = useState("");
  const [inten, setInten] = useState("N/A");
  const [legnth, setLength] = useState(0);
  const { value } = props;

  function handleBar() {
    var rgb = "0,0,0,1";
    var UV_level = value;
    var UV_intensity = "N/A";
    if (UV_level <= 2) {
      rgb = "0,255,0,1";
      UV_intensity = "low";
    } else if (UV_level <= 5) {
      rgb = "255, 191, 0,1";
      UV_intensity = "Moderate";
    } else if (UV_level <= 7) {
      rgb = "255, 128, 0 , 1";
      UV_intensity = "High";
    } else {
      rgb = "255, 0, 0 , 1";
      UV_intensity = "Very High";
    }
    setInten(UV_intensity);
    setColor(rgb);
    const width = (UV_level / 11) * 100;
    setLength(width + "%");
  }
  useEffect(() => {
    handleBar();
  });
  return (
    <div className="container">
      <h2>UV light</h2>
      <div style={{ display: "flex" }}>
        <h3>{value}</h3>
        <p>{inten}</p>
      </div>
      <div className="graph_container">
        <div className="bar__body">
          <div
            className="bar__level"
            style={{
              background: `linear-gradient(to right , rgba(0,255,0,1), rgba(${color}))`,
              width: `${legnth}`,
            }}
          ></div>
        </div>
        <ul className="units__list">
          <li className="unit">0</li>
          <li className="unit">1</li>
          <li className="unit">2</li>
          <li className="unit">3</li>
          <li className="unit">4</li>
          <li className="unit">5</li>
          <li className="unit">6</li>
          <li className="unit">7</li>
          <li className="unit">8</li>
          <li className="unit">9</li>
          <li className="unit">10</li>
          <li className="unit">11+</li>
        </ul>
      </div>
    </div>
  );
}
