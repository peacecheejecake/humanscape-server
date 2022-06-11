const express = require("express");
const cors = require("cors");
const axios = require("axios");

const config = require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://humanscape-team5a.netlify.app"],
  credential: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use((_, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://humanscape-team5a.netlify.app",
  );
});

app.get("/", async (req, res) => {
  const { searchText, numOfRows } = req.query;

  const response = await axios.get(
    "http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList",
    {
      params: {
        ServiceKey: config.parsed.KEY,
        _type: "json",
        sickType: 1,
        medTp: 2,
        searchText,
        numOfRows,
      },
    },
  );

  console.log(response);
  res.send(response.data);
});

app.listen(8080, () => {
  console.log(`Server running on ${8080}`);
});
