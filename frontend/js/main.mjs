import * as authFuncions from "./dataHandler.mjs";
import {
  addGlobalMessage,
  addGlobalMessageDOM,
  addPMessage,
  addPMessageDOM,
  addUser,
  addUserDOM,
  addUsersDOM,
  getMessagesFromChannel,
  putGlobalMessagesDOM,
  removeMessagesDOM,
  removeUsersDOM,
  initUsers,
} from "./functions.mjs";
import { fechaHora } from "./libs/fechas.mjs";
import { socketConfig } from "./constantes.mjs";
$(function () {
  console.log("Logueado ", authFuncions.Logueado());
  if (!authFuncions.Logueado()) {
    authFuncions.CerrarSessionYSalir();
  }

  // const socket = io("http://localhost:5000", {
  //   transports: ["websocket", "polling", "flashsocket"],
  // });

  const socket = io(socketConfig.url, socketConfig.config);
  var nick = "";
  let channel = "global";
  let users = {}; //{nickname:{socketId,cantMsg,chats:[]}};
  let usersSearch = {};
  let terminoBusc = "";
  let globalChat = { cantMsg: 0, chat: [] };

  const messageForm = $("#messages-form");
  const messageBox = $("#message");
  const chat = $("#idChat");

  const nickForm = $("#nick-form");
  const nickError = $("#nick-error");
  const $nickName = $("#nick-name");
  const titulo = $("#idUser");
  const badget = $("#idBadget");

  socket.on("connect", (datos) => {
    channel = "global";
    //console.log(socket.id);
  });

  socket.on("nuevo mensaje", function (data) {
    //console.log("nuevo mensaje users", msg, from);
    data.time = fechaHora(new Date().toISOString());
    data.myNick = nick;
    addGlobalMessage(globalChat, data);
    //console.log("GLOBALCHAT", globalChat);
    if (channel === "global") {
      addGlobalMessageDOM(chat, data);
      globalChat.cantMsg = 0;
    } else {
      globalChat.cantMsg++;
      $("#idBadge").css("visibility", "visible");
      $("#idBadge").text(globalChat.cantMsg.toString());
    }
  });

  socket.on("private-msg", (data) => {
    data.time = fechaHora(new Date().toISOString());
    data.myNick = nick;
    addPMessage(users, data);
    // console.log("private-msg",users);
    if (data.sender.trim() === channel) {
      addPMessageDOM(data.sender.trim(), data, channel);
    } else {
      if (data.sender.trim() in users) {
        users[data.sender].cantMsg++;
        removeUsersDOM();
        addUsersDOM(users);
      }
    }
  });

  socket.on("nuevo_usuario", (user) => {
    console.log(user);
    addUser(users, user);
    addUserDOM(user, 0);
  });

  socket.on("user_logout", (nickName) => {
    if (nickName.trim() in users) {
      delete users[nickName];
      addUsersDOM(users);
      if (nickName.trim() === channel) {
        channel = "global";
        $("#idChannel").text(channel);
        removeMessagesDOM();
      }
    }
  });

  $("#onlineUsers").on("click", ".Celem", function (e) {
    let newChannel = e.target.outerText.trim();
    if (newChannel != channel) {
      channel = newChannel;
      $("#idChannel").text(channel);
      users[channel].cantMsg = 0;
      removeMessagesDOM();
      addUsersDOM(users);
      getMessagesFromChannel(nick, users, channel.trim());
    }
  });

  $("#onlineUsers").on("click", ".Lusers", function (e) {
    let newChannel = $(this).children().children()[0].innerText;
    // let newChannel = $(this).children().find(".Celem").text().trim();
    // let cantMsg = $(this).children()[1].innerText.trim();

    console.log("new channel", newChannel);
  });

  $("#btnGlobal").on("click", function () {
    $("#idBadge").css("visibility", "hidden");
    if (channel != "global") {
      channel = "global";
      $("#idChannel").text(channel);
      removeMessagesDOM();
      putGlobalMessagesDOM(chat, nick, globalChat);
    }
  });

  $("#chatLogout").on("click", function (e) {
    socket.emit("logout", nick);
    document.location.href = "login.html";
  });

  $("#idBuscar").on("click", function () {
    usersSearch = {};
    terminoBusc = "";
    //console.log(usersSearch);
  });

  $("#idBuscar").on("keyup", function () {
    let currTerm = $(this).val();

    terminoBusc += currTerm.toLowerCase();
    //  console.log(users, terminoBusc);
    for (let u in users) {
      if (u.includes(terminoBusc)) {
        usersSearch[u] = users[u];
      }
    }
    removeUsersDOM();
    addUsersDOM(usersSearch);

    terminoBusc = "";
    usersSearch = {};
    //console.log("usersSearch", usersSearch);

    // $("#onlineUsers li").filter(function () {
    //   $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    // });
  });

  messageForm.submit((e) => {
    e.preventDefault();
    if (channel === "global") {
      socket.emit("enviar mensaje", { msg: messageBox.val(), from: nick });
    } else {
      socket.emit("mensaje_privado", {
        sender: nick,
        to: channel,
        msg: messageBox.val(),
      });
      const data = {
        sender: nick,
        myNick: nick,
        to: channel.trim(),
        msg: messageBox.val(),
        time: fechaHora(new Date().toISOString()),
      };
      addPMessage(users, data);
      addPMessageDOM(channel, data);
    }

    messageBox.val("");
  });

  nickForm.submit((e) => {
    e.preventDefault();
    channel = "global";
    socket.emit(
      "nuevo_usuario",
      $nickName.val().trim(),
      (exito, usersServer) => {
        if (exito) {
          nick = $nickName.val().trim();
          titulo.text(`CHAT : ${nick.toLocaleUpperCase()}`);
          // console.log("users", users);
          $("#idChannel").text("global");
          initUsers(users, usersServer, nick);
          removeUsersDOM();
          addUsersDOM(users);
          $("#nick-wrap").hide();
          $("#content-wrap").show();
        } else {
          nickError.html(`
                <div class="alert alert-danger">
                El usuario ya existe
                </div>
                `);
        }
        $nickName.val("");
      }
    );
  });
});
