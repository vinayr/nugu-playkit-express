// 어제 날씨 알려줘
// 오늘 날씨 알려줘
// 내일 날씨 알려줘

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const days = {
  "YESTERDAY": "어제",
  "TODAY": "오늘",
  "TOMORROW": "내일",
}

const response = {
  "version": "2.0",
  "resultCode": "OK",
  "output": {}
};

const healthCheck = (req, res) => {
  res.sendStatus(200);
}

const weatherHandler = (req, res) => {
  try {
    console.log("===REQUEST===\n", JSON.stringify(req.body));
    const day = req.body.action.parameters["day"].value;
    response.output.day = days[day];
    response.output.status = "맑아요";
    res.json(response);
  } catch (err) {
    console.log("nugu error", err);
    res.sendStatus(500);
  }
};

app.use(bodyParser.json());
app.get("/health", healthCheck)
app.post("/answer.weather", weatherHandler);
app.listen(port);
console.log("nugu listening on port", port);
