const knex = require("knex")(require("../knexfile.js").development);

const getAllPost = (req, res) => {
  console.log(knex("posts"));
  knex("posts")
    // .select(
    //   "posts.id as post_id",
    //   "posts.title",
    //   "posts.content",
    //   "posts.updated_at",
    //   "users.id as user_id",
    //   "users.avatar_url",
    //   "users.username"
    // )
    // .from("posts")
    // .leftJoin("users", "posts.user_id", "users.id")
    // .orderBy("posts.id", "desc")
    .then((posts) => {
      // let updatedPosts = posts;
      // if (req.user) {
      //   updatedPosts = updatedPosts.map((post) => {
      //     return {
      //       ...post,
      //       isCurrentUser: post.user_id === req.user.id,
      //     };
      //   });
      // }

      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: "Error fetching posts" });
    });
};

const createNewPost = (req, res) => {
  const userId = req.user;
  if (userId === undefined)
    return res.status(401).json({ message: "Unauthorized" });
  if (!req.body.title || !req.body.content) {
    return res
      .status(400)
      .json({ message: "Missing post tilte or content fields" });
  }
  knex("posts")
    .insert({
      user_id: req.user.id,
      title: req.body.title,
      content: req.body.content,
    })
    .then((postId) => {
      res.status(201).json({ newPostId: postId[0] });
    })
    .catch(() => {
      res.status(500).json({ message: "Error creating a new post" });
    });
};

module.exports = {
  getAllPost,
  createNewPost,
};
