import likeModel from "../models/Like.js";

const likeController = {
  getLikes: async (req, res, next) => {
    let postId = req.params.postId;
    try {
      const likes = await likeModel.find({ postId: postId });
      return res.status(200).json(likes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  publicLike: async (req, res, next) => {
    let { postId, username } = req.body;
    try {
      const oldLike = await likeModel.findOne({
        postId: postId,
        username: username,
      });
      if (!oldLike) {
        const like = await new likeModel(req.body);
        if (!like) {
          return res.status(400).json({ msg: "Invalid input." });
        }
        like.save();
        return res.status(200).json({ msg: "Liked successfully." });
      } else {
        const rs = await likeModel.findOneAndDelete({ _id: oldLike._id });
        return res.status(200).json({ msg: "Remove Like successfully." });
      }
    } catch (error) {
      return res.status(500).json({ error: err.message });
    }
  },
  deleteLike: async (req, res, next) => {
    let id = req.params.id;
    try {
      const like = await likeModel.findOneAndDelete({ _id: id });
      if (!like) {
        return res.status(404).json({ msg: "Not exits" });
      }
      return res.status(200).json({ msg: "remove successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: err.message });
    }
  },
};

export default likeController;
