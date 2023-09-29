const express = require("express");
const app = express();
require("./config/Db")
const cors = require('cors')
const PORT = 3500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const Adminroutes = require('./Routers/Adminrouter')
const Userroutes = require('./Routers/Userrouter')
const Subscriptionroutes = require('./Routers/Subscriptionrouter')
const Organizationrouter = require('./Routers/Organizationrouter')
const Productrouters = require('./Routers/Productroutes')
app.use("/", Adminroutes)
app.use("/", Userroutes)
app.use("/", Subscriptionroutes)
app.use("/", Organizationrouter)
app.use("/", Productrouters)







app.listen(PORT, () => console.log("Server running on port " + PORT));