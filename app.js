// Imports
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport");
const mongoose = require("mongoose");
// config
const config = require("./config/database");

const app = express();
const PORT = 3001;
const users = require("./routes/users")

// ==============| Connect To Database |====================
mongoose.connect(config.databse,  { useNewUrlParser: true });

// ==============| On Connected |====================
mongoose.connection.on("connected", () => {
    console.log("Connected to database" + config.databse);
});

// ==============| Error |====================
mongoose.connection.on("error", (err) => {
    console.log("Database error:" + err);
});

// ==============| CORS MIDDLEWARE |====================
app.use(cors());

// ==============| Set Static Folder |====================
app.get("/", (express.static(path.join(__dirname, "public"))));

// ==============| BODY-PARSER MIDDLEWARE |====================
app.use(bodyParser.json());

// ==============| Passport Middleware |====================
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// ==============| INDEX |====================
app.get("/", (req, res, next) => {
    res.send("<h1>asda</h1>");
})



// ==============| Start Server |====================
app.listen(PORT);