const express = require("express");
const cors = require("cors");
require("dotenv").config();

var corsOptions = {
    origin: "http://localhost:5173"
};

const Controllers = require('./controllers')
const app = express();

app.use(cors(corsOptions));

let dbConnect = require("./dbConnect");

// parse requests of content-type -application/json
app.use(express.json());

let debtRoutes = require('./routes/debtRoutes')
app.use('/api/debts', debtRoutes)

let userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running onport ${PORT}.`);

    // Controllers.initialController.storeUsers()
    // Controllers.initialController.storeUsers()


});
