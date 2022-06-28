const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoute = require("./src/routes/productRoute.js");
require("./src/db/dbconnection.js");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(productRoute);

let PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
