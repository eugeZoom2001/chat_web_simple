import { dSetUser } from "./dataHandler.mjs";
$(function () {
  const loguear = (user) => {
    dSetUser(user);
  };

  loguear({ id: "125332ggg", user: "euge", token: "aaa333233333333" });

  document.location.href = "index.html";
});
