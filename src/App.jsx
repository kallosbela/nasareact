import "./App.css";
import * as React from "react";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";

import Container from "@mui/material/Container";

import MaterialUIPickers from "./components/Date.jsx";

import dayjs, { Dayjs } from "dayjs";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const loadData = async (url, time) => {
    const response = await axios.get(url);
    console.log(response.data);
    if (time === "today") {
      setData(response.data);
    } else if (time === "previous") {
      setPreviousData(response.data);
    } else if (time === "range") {
      setRangeData(response.data);
    }
  };

  const [data, setData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [date, setDate] = useState("");
  const [value, setValue] = React.useState(dayjs(Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  //gallery
  const [startDate, setStartDate] = React.useState(dayjs(Date()));
  const [endDate, setEndDate] = React.useState(dayjs(Date()));
  const handleStartChange = (startDate) => {
    setStartDate(startDate);
  };
  const handleEndChange = (endDate) => {
    setEndDate(endDate);
  };

  return (
    <div className="App">
      <Container>
        <h1>NASA Api</h1>
      </Container>

      {/* Picture of the day */}
      <Container className="container">
        <Stack spacing={2} direction="row">
          <Button
            color="success"
            //style={{ backgroundColor: "darkgrey" }}
            variant="contained"
            onClick={() => {
              loadData(
                "https://api.nasa.gov/planetary/apod?api_key=tI8PBj5CbSYKZOiRm86XrhbY3JFYvXrwHob002Ns",
                "today"
              );
            }}
          >
            Load picture of the day
          </Button>
        </Stack>
        {data && (
          <div className="pictureOfTheDay">
            <h1>{data.title}</h1>
            {data.media_type === "image" ? (
              <img src={data.url} alt="NASA picture" />
            ) : (
              <iframe
                width="100%"
                height="100%"
                controls
                src={data.url}
                type="video/mp4"
              ></iframe>
            )}
            <p>{data.date}</p>
            <p>{data.explanation}</p>
          </div>
        )}
      </Container>

      {/* The picture of a previous day */}
      <Container className="container">
        <Stack spacing={2} direction="row">
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              //YYYY-MM-DD
              loadData(
                `https://api.nasa.gov/planetary/apod?api_key=tI8PBj5CbSYKZOiRm86XrhbY3JFYvXrwHob002Ns&date=${value.format(
                  "YYYY-MM-DD"
                )}`,
                "previous"
              );
            }}
          >
            Load a previous picture
          </Button>
          <ThemeProvider theme={theme}>
            <MaterialUIPickers value={value} handleChange={handleChange} />
          </ThemeProvider>
        </Stack>
        {previousData && (
          <div className="previousDay">
            <h1>{previousData.title}</h1>
            {previousData.media_type === "image" ? (
              <img src={previousData.url} alt="NASA video" />
            ) : (
              <div className="videocontainer">
                <iframe
                  className="responsive-iframe"
                  style={{ width: "100%", height: "100%" }}
                  src={previousData.url}
                  type="video/mp4"
                  controls
                />
              </div>
            )}
            <p>{previousData.date}</p>
            <p>{previousData.explanation}</p>
          </div>
        )}
      </Container>

      {/* The picture gallery */}
      <Container className="container">
        <Stack spacing={2} direction="row">
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              //YYYY-MM-DD
              loadData(
                `https://api.nasa.gov/planetary/apod?api_key=tI8PBj5CbSYKZOiRm86XrhbY3JFYvXrwHob002Ns&start_date=${startDate.format(
                  "YYYY-MM-DD"
                )}&end_date=${endDate.format("YYYY-MM-DD")}`,
                "range"
              );
            }}
          >
            Load pictures from a date range
          </Button>
          From
          <ThemeProvider theme={theme}>
            <MaterialUIPickers
              value={startDate}
              handleChange={handleStartChange}
            />
          </ThemeProvider>
          To
          <ThemeProvider theme={theme}>
            <MaterialUIPickers value={endDate} handleChange={handleEndChange} />
          </ThemeProvider>
        </Stack>
        {rangeData &&
          rangeData.map((data) => (
            <div className="previousDay" key={data.date}>
              <h1>{data.title}</h1>
              {data.media_type === "image" ? (
                <img src={data.url} alt="NASA video" />
              ) : (
                <div className="videocontainer">
                  <iframe
                    className="responsive-iframe"
                    style={{ width: "100%", height: "100%" }}
                    src={data.url}
                    type="video/mp4"
                    controls
                  />
                </div>
              )}
              <p>{data.date}</p>
              <p>{data.explanation}</p>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default App;
