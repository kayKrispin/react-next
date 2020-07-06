import express from "express";
import path from "path";
import React from "react";
import renderer from "./middleware/renderer";

const app = express();
const router = express.Router();

const PORT = "8080";

router.use(express.static(
  path.resolve(__dirname, "..", "build"),
  { maxAge: "30d", index: false },
));

router.use('*', renderer);

app.use(router);

app.listen(PORT, () => console.log(`Running on port, ${PORT}`));


