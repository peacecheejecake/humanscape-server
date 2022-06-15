import express from "express";
import { config } from "dotenv";
import axios from "axios";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

const PORT = config().parsed?.port || 8080;
const KEY = config().parsed?.KEY;

const app = express();

// app.use(
//   cors({
//     origin: 'https://humanscape-client.vercel.app',
//   }),
// );
// app.use(cors());

app.use((req, res, next) => {
  console.log(req);
  res.header("Access-Control-Allow-Origin", "*");
});

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // const data = await readFilePromise('./data/dissNameCodeList.json');
  // console.log(data);
  console.log("request in");
  const r = await axios.get(
    `http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?ServiceKey=${KEY}&numOfRows=2000&diseaseType=SICK_NM&medTp=2&_type=json`,
  );
  console.log(r.data);
  res.send(r.data.response.body);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
