const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://humanscape-team5a.netlify.app"],
  credential: true,
  optionsSuccessStatus: 200,
};

app.use((_, res) => {
  res.header("Access-Control-Allow-Origin", "https://humanscape-team5a.netlify.app");
});

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  const textQuery = req.query.searchText;
  const numOfRowsQuery = req.query.numOfRows;

  axios
    .get(
      "http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList",
      {
        params: {
          sickType: 1,
          medTp: 2,
          searchText: textQuery,
          ServiceKey: 'uVvMtekN5Q4wkwgFzjYoou6YPy56Ox0s0YIRX7gYF0RxwLLX7vdQCRjUrHaDArbnrP9vyy/IdHBVKI2exzPF9w==',
          numOfRows: numOfRowsQuery,
          _type: "json",
        },
      }
    )
    .then(response => res.send(response.data));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
