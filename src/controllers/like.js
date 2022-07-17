import likeModel from "../models/Like.js";

const likeController = {
  getLikes: async (req, res, next) => {
    let postId = req.params.postId;
    try {
      const likes = await likeModel.find({ postId: postId });
      return res.status(200).json(likes);
    } catch (error) {
      return next(error);
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
          const error = new Error("Invalid input.");
          error.statusCode = 400;
          return next(error);
        }
        like.save();
        return res.status(200).json({ msg: "Liked successfully." });
      } else {
        const rs = await likeModel.findOneAndDelete({ _id: oldLike._id });
        return res.status(200).json({ msg: "Remove Like successfully." });
      }
    } catch (error) {
      return next(error);
    }
  },
  deleteLike: async (req, res, next) => {
    let id = req.params.id;
    try {
      const like = await likeModel.findOneAndDelete({ _id: id });
      if (!like) {
        const error = new Error("favorite not exist");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ msg: "remove successfully." });
    } catch (error) {
      return next(error);
    }
  },
};

export default likeController;
