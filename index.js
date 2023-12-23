const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require("body-parser");

require("dotenv").config();

const database = require('./config/database');
const systemConfig = require('./config/system');

database.connect();

const routeClient = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");


const app = express();
const port = process.env.PORT;

// Bien toan cuc
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});