require("dotenv").config();
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies */
appSockets = express();
const { users_admin } = require("./test/users");
const { findUser } = require("./functions/f_users");
const { socketHandler, getUsers, addUser } = require("./sockets");

//appSockets.use(cors2());

app.get("/", (req, res) => {
  //console.log(`server at ${process.env.PORT}`);
  res.send(`Hola soy el server at ${process.env.PORT}`);
});

app.get("/users", (req, res) => {
  res.status(200).send(getUsers());
});

app.post("/login", (req, res) => {
  const { user, email } = { ...req.body };
  console.log("users", getUsers());
  // falta agregar addUser si no existe el usuario;
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

socketHandler(socketio);

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