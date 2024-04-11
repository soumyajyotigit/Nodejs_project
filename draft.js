const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/error');
const unless = require('express-unless');

const app = express();
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database Connected");
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

// Define authenticateToken middleware
const authenticateToken = (req, res, next) => {
    // Your authentication logic here
    next();
};

// Attach unless method to authenticateToken middleware
authenticateToken.unless = unless;

// Use authenticateToken middleware
app.use(
    authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] },
        ],
    })
);

app.use(express.json());

app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
