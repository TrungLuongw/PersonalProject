import commentModel from "../models/Comment.js";

const commentController = {
  getComment: async (req, res, next) => {
    let postId = req.params.id;
    try {
      const comments = await commentModel
        .find({ postId: postId })
        .sort({ createdAt: -1 });
      if (!comments) {
        return res.status(200).json({ msg: "No comments found." });
      }
      return res.status(200).json(comments);
    } catch (error) {
      return next(error);
    }
  },
  publicComment: async (req, res, next) => {
    try {
      const comment = await new commentModel(req.body);
      if (!comment) {
        const error = new Error("Invalid input.");
        error.statusCode = 400;
        return next(error);
      }
      comment.save();
      return res.status(200).json({ msg: "Comment saved successfully." });
    } catch (error) {
      return next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    try {
      const comment = await commentModel.findOneAndDelete({ _id: id });
      if (!comment) {
        const error = new Error("No comments found.");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ msg: "Comment deleted successfully." });
    } catch (error) {
      return next(error);
    }
  },
};

export default commentController;
