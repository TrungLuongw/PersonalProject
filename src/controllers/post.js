import postModel from "../models/Post.js";

const postController = {
  getPosts: async (req, res, next) => {
    let category = req.query.category;
    console.log(category);
    try {
      let posts;
      if (!category || category == "ALL") {
        posts = await postModel.find({}).sort({ createdAt: -1 });
      } else {
        posts = await postModel.find({ category: category });
      }

      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const post = await postModel.findOne({ _id: req.params.id });
      if (!post) {
        const error = new Error("Post not found ");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  },
  publicPost: async (req, res, next) => {
    try {
      const post = await new postModel(req.body);
      post.save();
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  },
  putPost: async (req, res, next) => {
    let id = req.params.id;
    try {
      const post = await postModel.findOneAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ msg: "post updated successfully" });
    } catch (error) {
      return next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const post = await postModel.findOneAndDelete({ _id: req.params.id });
      if (!post) {
        const error = new Error("Post not found ");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ msg: "post deleted successfully" });
    } catch (error) {
      return next(error);
    }
  },
};

export default postController;
