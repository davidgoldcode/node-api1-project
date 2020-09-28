const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  { id: 1, name: "Jane Doe", bio: "Not Tarzans Wife" },
  { id: 2, name: "Frank", Bio: "Friend" },
  { id: 3, name: "Dave", Bio: "Another friend" },
];
let nextId = 4;

server.get("/api/users", (req, res) => {
  try {
    res.status(200).json({ data: users });
  } catch {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved",
      error,
    });
  }
});

server.post("/api/users", (req, res) => {
  const data = req.body;
  const found = Object.keys(data).some((k) => {
    return data[k] === "";
  });
  if (found) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (found === false) {
    users.push({ id: nextId++, ...data });
    res.status(201).json({ data, users });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database ",
    });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  found = users.filter((item) => item.id === id);

  if (found) {
    res.status(201).json({ data: found });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});
// to go back

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  let hasId = users.some((item) => item.id === id);
  try {
    if (hasId) {
      users = users.filter((l) => l.id !== id);
      res.status(200).json({ data: users });
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist",
      });
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: "The user could could not be removed" });
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  const found = users.find((item) => item.id === id);

  try {
    if (found) {
      Object.assign(found, changes);
      res.status(200).json({ data: users });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user" });
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified" });
  }
});

server.listen(4000, () => console.log("The server is running on port 4000"));
