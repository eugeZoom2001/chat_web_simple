let users_admin = [
  { user: "eugenio_admin", email: "eugenionoche2@gmail.com" },
  { user: "axel_admin", email: "axel@gmail.com" },
  { user: "pedro", email: "pedro@gmail.com" },
  { user: "lucia", email: "lucia@gmail.com" },
  { user: "maria", email: "maria@gmail.com" },
];

let usuarios = users_admin.map((a) => ({ ...a }));

usuarios[0].email = "euge2@gmail.com";

console.log(usuarios);
console.log(users_admin);

/* let numbers = [1, 2, 3];
let num2 = [...numbers];
num2[0] = 2;
console.log(numbers);
console.log(num2); */
