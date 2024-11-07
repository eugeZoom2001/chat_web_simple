let users = [
  { user: "eugenio_admin", email: "eugenionoche2@gmail.com" },
  { user: "axel_admin", email: "axel@gmail.com" },
  { user: "pedro", email: "pedro@gmail.com" },
  { user: "lucia", email: "lucia@gmail.com" },
  { user: "maria", email: "maria@gmail.com" },
];

let moreUsers = users.map((a) => ({ ...a }));
moreUsers[0].email = "euge2@gmail.com";
moreUsers = [...moreUsers, { user: "alejandro", email: "ale@gmail.com" }];

console.log(moreUsers);
//moreUsers[0].email = "euge2@gmail.com"; // mal modifica el original
console.log(users);
