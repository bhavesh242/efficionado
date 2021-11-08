const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

//Setting up express server
const app = express();

//Express.json is used to recognize incoming requests as JSON Objects
app.use(express.json());

//used to Allow Cross-Origin Resource Sharing
app.use(cors());

//Get configurations from Config files
const PORT = config.get("Efficionado.port") || 5000;
const dbConnectionString = config.get('Efficionado.dbConfig.dbName')

//Start up the server to listen on the defined port
app.listen(PORT, () => console.log(`Server has Started on port: ${PORT}`))

// The following code attempts to connect to MongoDB (hosted on ATLAS in our case)
mongoose.connect(dbConnectionString, {
})
    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.log("MongoDB Could not be connected", err);
    });

console.log(config.get("Efficionado.jwtSecret"))
//Define Routes
app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todo"));