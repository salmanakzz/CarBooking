require("dotenv").config();
const db = require("./config/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

// import routes files
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin")

const { urlencoded } = require("express");

//use cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));

//conecting to database
db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:" + err);
  } else {
    console.log("Database Connected Successfully");
  }
});

//use the imported routes
app.use("/", userRouter);
app.use("/admin", adminRouter);

//port listening
app.listen(PORT, () => console.log(`Port running at ${PORT}`));
