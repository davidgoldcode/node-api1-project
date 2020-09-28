const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

const users = [
  { id: shortid.generate(), name: "Jane Doe", bio: "Not Tarzans Wife" },
];

server.get("/api/users", (req, res) => {
  res.status(200).json({ data: users });
});

server.post("/api/users", (req, res) => {
  const data = req.body;
  const { name, bio } = data;
  if (name !== "" || bio !== "") {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users.push({ id: shortid.generate(), ...data });
    res.status(201).json({ data, users });
  }
});

server.listen(4000, () => console.log("The server is running on port 4000"));
