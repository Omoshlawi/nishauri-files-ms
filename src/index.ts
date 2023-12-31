import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleErrors } from "./middlewares";
import morgan from "morgan";
import { configuration } from "./utils";
import router from "./features/files/route";
import ip from "ip";

const app = express();
// --------------------middlewares---------------------------

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.info(
    `[+]${configuration.name}:${configuration.version} enable morgan`
  );
}
app.use(cors());
// ------------------End middlewares------------------------

//------------------- routes --------------------------------

app.use("/", router);
//-------------------end routes-----------------------------

//---------------- error handler -----------------------
app.use(handleErrors);
//---------------- end error handler -----------------------

const port = configuration.port ?? 0;
app.listen(port, () => {
  // console.log(ip.address());

  console.log(
    `[+]${configuration.name}:${configuration.version} listening on port ${port}...`
  );
});
