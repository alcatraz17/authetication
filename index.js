const express = require("express")
const app = express();
require("dotenv").config();
const mongoose = require ("mongoose");
const cors = require("cors");
// Import Routes
const authRoute = require("./routes/auth");

//Middlewares
app.use(express.json());
app.use(cors());
//Route middleware
app.use("./api/User", authRoute);

const uri = process.env.uri;
const port = process.env.port;

// Connect to DB

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to DB!"))




//Route middlewares
app.use("/api/user", authRoute)


app.listen(port, () => console.log("Server up and running"));

