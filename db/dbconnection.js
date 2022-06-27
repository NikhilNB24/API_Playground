const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const YOUR_MONGODB_URL = "mongodb://localhost:27017/product";

mongoose
    .connect(YOUR_MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("Could not connect to the database. Error...", err);
        process.exit();
    });
