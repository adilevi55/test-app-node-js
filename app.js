const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const controllerProduct = require("./controllers/product-controller");
const controllerAuthentication = require("./controllers/authentication-controller");

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use("/api/product/",controllerProduct);
app.use("/api/authentication/",controllerAuthentication);




app.listen(port);
