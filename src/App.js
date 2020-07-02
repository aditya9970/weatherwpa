import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import MainComponent, {
  ExtraComponent,
  UVComponent,
} from "./components/MainComponent";

function App() {
  var [input, setInput] = useState("");
  var [data, setData] = useState({});
  var [data_UV, setUV] = useState({});
  var [isloading, setisloading] = useState(false);
  const key = "c5b7f9f39502aacadd0e8a1c31eee936#";
  var link = `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`;
  const fetchData = async () => {
    var { data } = await axios(link);
    setData(data);
    var link_UV = `http://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}`;
    console.log(link_UV);
    fetchUV(link_UV);
  };
  const fetchUV = async (link) => {
    var { data } = await axios(link);
    setUV(data);
    setisloading(false);
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setisloading(true);
    fetchData();
  };

  return (
    <div className="App">
      <div className="search__container">
        <input
          className="search__input"
          placeholder="Search"
          type="text"
          value={input}
          onChange={handleChange}
        />
        <button className="btn__search" onClick={handleSubmit}>
          <i className="fa fa-search btn__icon"></i>
        </button>
      </div>
      {data.name && data_UV.value ? (
        <>
          <MainComponent
            weather={data.weather[0]}
            main={data.main}
            location={data.name}
            country={data.sys.country}
          />
          <ExtraComponent data={data} />
          <UVComponent value="11" level="Low" />
        </>
      ) : (
        <div className="instruction">Enter Your location</div>
      )}
      {isloading && (
        <div className="loader__body">
          <div className="loader">Loading</div>
        </div>
      )}
    </div>
  );
}

export default App;
