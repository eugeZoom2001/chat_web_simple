// recibe un string con el nombre del item y devuelve
// un objeto con su valor o null
// despues pone el item en null

export function dGetToken() {
  let token = null;
  token = sessionStorage.getItem("token");
  return token;
}

export function dSetToken(token) {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", null);
  }
}

// function dGetItem(item) {
//   let itemBusc = null;
//   itemBusc = localStorage.getItem(item);
//   localStorage.setItem(item, null);
//   return itemBusc;
// }
export function dGetItem(item) {
  let itemBusc = null;
  itemBusc = JSON.parse(sessionStorage.getItem(item));
  //sessionStorage.setItem(item,null)
  sessionStorage.removeItem(item);
  return itemBusc;
}

export function dSetItem(item, valor) {
  if (valor) {
    sessionStorage.setItem(item, JSON.stringify(valor));
  } else {
    sessionStorage.setItem(item, null);
  }
}

export const dSetUser = ({ user }) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
const dGetUser = () => {
  let user = null;
  user = JSON.parse(sessionStorage.getItem("user"));
  return user;
};

export const Logueado = () => {
  const user = dGetUser();
  let result = false;
  //console.log("user logueado", user);
  if (user) {
    result = true;
  }
  return result;
};

export const CerrarSessionYSalir = () => {
  console.log("salgo");
  // dSetUser(null);
  // dSetToken(null);
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  document.location.href = "login.html";
};

export const AbrirSesion = (tiempo) => {
  setTimeout(function () {
    CerrarSessionYSalir();
  }, tiempo);
};
