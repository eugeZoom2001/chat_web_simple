const users_admin = [
  { user: "eugenio_admin", email: "eugenionoche2@gmail.com" },
  { user: "axel_admin", email: "axel@gmail.com" },
  { user: "pedro", email: "pedro@gmail.com" },
  { user: "lucia", email: "lucia@gmail.com" },
  { user: "maria", email: "maria@gmail.com" },
];

const users_logged = [
  { user: "eugenio_admin", email: "eugenionoche2@gmail.com" },
  { user: "lucia", email: "lucia@gmail.com" },
  { user: "maria", email: "maria@gmail.com" },
];

const usersAvailable = () => {
  let users_available = users_admin.filter((eAd) => {
    return !users_logged.some((el) => el.email === eAd.email);
  });
  return users_available;
};

const usersAvailable2 = () => {
  let users_available = users_admin.filter(
    (eAd) => !users_logged.some((el) => el.email === eAd.email)
  );
  return users_available;
};
const usersAvailable3 = () =>
  users_admin.filter(
    (eAd) => !users_logged.some((el) => el.email === eAd.email)
  );

console.log(usersAvailable2());
