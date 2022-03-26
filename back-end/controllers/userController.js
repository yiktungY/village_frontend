const knex = require("knex")(require("../knexfile").development);

const getAllUser = (req, res) => {
  knex("users")
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res
          .status(400)
          .json({ message: `Error getting user ${req.params.id}` });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: `Error getting user ${req.params.id}` });
    });
};

const getUserById = (req, res) => {
  const typeId = req.params.id;
  // const foundUser = knex("users").find((user) => user.id === typeId);
  // console.log(foundUser);
  console.log(typeId);
  knex("users")
    .where({ id: typeId })
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json(user.shift());
      } else {
        res
          .status(400)
          .json({ message: `Error getting user ${req.params.id}` });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: `Error getting user ${req.params.id}` });
    });
};

module.exports = {
  getUserById,
  getAllUser,
};
