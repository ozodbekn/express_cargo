// moongose - ODM("ObjectDocumentmapping")
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.routes");

const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());

app.use("/api", indexRouter);

async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server started at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
