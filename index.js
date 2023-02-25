const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const blogsRouter = require("./router/blogsRouter");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("tech-trends db connection successful!"))
  .catch((err) => console.log(err));

app.use("/blogs", blogsRouter);

app.listen(port, () => {
  console.log(`tech-trends app listening on port ${port}`);
});
