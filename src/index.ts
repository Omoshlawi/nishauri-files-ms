import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleErrors } from "./middlewares";
import morgan from "morgan";
import router from "./features/registry/route";
import { configuration } from "./utils";

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
  console.log(
    `[+]${configuration.name}:${configuration.version} listening on port ${port}...`
  );
});
