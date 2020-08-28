const express = require("express");
const app = express();
const route = require("./routes/Route");
app.enable("trust proxy");

/* ------------------------------- middlewares ------------------------------ */

app.use(express.json());
app.use(express.static("./public"));

const port = process.env.PORT || 8000;

app.use("/", route);
app.listen(port, () => {
  console.log(`app is atarted at port http://localhost:${port}`);
});
