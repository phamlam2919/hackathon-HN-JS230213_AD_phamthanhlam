const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const server = express();

//
const usersRoutes = require("./routes/user.routes");
//

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(express.static("public"));

server.use("/api/v1/users", usersRoutes);

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000/");
});
