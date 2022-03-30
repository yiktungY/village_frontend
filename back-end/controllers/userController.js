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

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await knex("users").where({ id }).update(changes);
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: "ID not fond" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: {err} });
  }
};

module.exports = {
  getUserById,
  getAllUser,
  updateUserProfile,
};
