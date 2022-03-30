const knex = require("knex")(require("../knexfile.js").development);

const applyToPost = (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  if (userId === undefined)
    return res.status(401).json({ message: "Unauthorized" });
  // if (!req.body.title || !req.body.content) {
  //   return res
  //     .status(400)
  //     .json({ message: "Missing post tilte or content fields" });
  // }
  knex("applyList")
    .insert({
      userId: req.user.id,
      postId: req.body.post_id,
      content: req.body.content,
    })
    .then((data) => {
      res.status(201).json({ newUser: data[0] });
    })
    .catch(() => {
      res.status(500).json({ message: "Error creating a new post" });
    });
};

const getAllApplicants = (req, res) => {
  // console.log("req", req);
  knex("applyList")
    .then((posts) => {
      //   let updatedPosts = posts;
      //   if (req.user) {
      //     updatedPosts = updatedPosts.map((post) => {
      //       return {
      //         ...post,
      //         isCurrentUser: post.user_id === req.user.id,
      //       };
      //     });
      //   }
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: "Error fetching posts" });
    });
};

module.exports = {
  applyToPost,
  getAllApplicants
};
