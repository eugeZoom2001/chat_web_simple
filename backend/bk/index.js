var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies */
appSockets = express();
const { users_admin } = require("./test/users");
const { findUser } = require("./functions/f_users");

//appSockets.use(cors2());

app.get("/", (req, res) => {
  res.send("hola , soy Server 8800!");
});

app.post("/login", (req, res) => {
  const { user, email } = { ...req.body };
  const myUser = findUser(users_admin, { user, email });
  myUser
    ? res.status(200).send({ myUser })
    : res.status(404).send({ error: "Usuario no Existe !!" });
});

//******************************************** */
const port = process.env.PORT || 8800;

const serverSockets = require("http").Server(appSockets);
const socketio = require("socket.io")(serverSockets);
appSockets.set("port", process.env.SOCKET_PORT || 5000);

//Ejecutamos la función de sockets.js
require("./sockets")(socketio);

const startSockets = () => {
  serverSockets.listen(appSockets.get("port"), () => {
    console.log("Servidor sockets en el puerto ", appSockets.get("port"));
  });
};

const startServer = async () => {
  try {
    // connectDB
    // await connectDB(process.env.DB_URI_LOCAL);
    //console.log(`BBDD conectada ${process.env.DB_URI_LOCAL}`);

    app.listen(port, () => console.log(`Server escuchando puerto ${port}...`));
  } catch (error) {
    console.log("no hay conexion a datos");
  }
};

try {
  startServer().then(startSockets());
} catch (error) {}
