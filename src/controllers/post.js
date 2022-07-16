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
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  getPost: async (req, res, next) => {
    try {
      const post = await postModel.findOne({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ msg: "No post found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  publicPost: async (req, res, next) => {
    try {
      const post = await new postModel(req.body);
      post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
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
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(200).json({ msg: "post updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const post = await postModel.findOneAndDelete({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(200).json({ msg: "post deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default postController;
