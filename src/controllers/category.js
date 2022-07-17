import categoryModel from "../models/Category.js";
const categoryControllers = {
  get: async (req, res, next) => {
    try {
      const categories = await categoryModel.find({}).sort({ name: 1 });
      return res.status(200).json(categories);
    } catch (error) {
      return next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const category = await new categoryModel(req.body);
      await category.save();
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default categoryControllers;
