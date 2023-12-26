const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser")
const session = require("express-session")

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
// End bien toan cuc

app.set("views", "./views");
app.set("view engine", "pug");

// Flash 
app.use(cookieParser('...'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash 

app.use(express.static("public"));

app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded - Convert data của form để truyền cho biến req.body
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
routeClient(app);
routeAdmin(app);
// End Routes

app.listen(port, () => {
    console.log(`App listening on http://127.0.0.1:${port}`);
});