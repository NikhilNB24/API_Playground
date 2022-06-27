const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute.js");
require("./db/dbconnection.js");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(productRoute);

let PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
