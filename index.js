const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;

users = [
  { name: "Sallar Hussain Bhutto", username: "sallar1", password: "dsu@1" },
  { name: "Arslan Ahmed", username: "a1", password: "dsu@2" },
];

app.get("/getUsers", (req, res) => {
  res.json({ users: users });
});

app.use(bodyParser.json());
app.use(cors());

app.get("/getHello", (req, res) => {
  res.send("Hello world!");
});

app.get("/getHello2", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/registerUser", (req, res) => {
  console.log("req.body: ", req.body);
  users.push({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  res.json({ message: "post method", users: users });
});

//login

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const filteredUser = users.filter((user) => user.username === username);
  if (filteredUser.length) {
    const user = filteredUser[0];
    if (user.username === username && user.password === password) {
      res.status(200).json({
        data: { name: user.name, username: user.username },
        message: "Valid User",
        error: null,
      });
    } else {
      res.status(401).json({ error: "Invalid credentals" });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/register", function (req, res) {
  console.log("req.body: ", req.body);
  if (req.body.name || req.body.username || req.body.username) {
    res.sendStatus(400);
  }
  users = [
    ...users,
    {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    },
  ];
  res.json({ message: "User created" });
});

app.listen(port, () => {
  console.log(`server is up on http://localhost:${port}`);
});
