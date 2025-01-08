const express = require("express");
const colors = require("colors"); //better looking infos
const morgan = require("morgan"); //middleware logging
const dotenv = require("dotenv");
const mysqlPool = require("./config/db");
const cors = require("cors");

//setting dotenv
dotenv.config();

const app = express();

app.use(cors({}));

//middlewares
//
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/post", require("./routes/postRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>estagio</h1>");
});

const PORT = process.env.PORT;

mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL DB Connected".blue);

    app.listen(PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`.red);
    });
  })
  .catch((err) => {
    console.log(err);
  });
