import Category from "../models/category";
import Product from "../models/product";

const createCategory = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    const response = await Category.create(req.body);

    return res.json({
      success: response ? true : false,
      createdCategory: response
        ? response
        : "Cannot create new product category",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const response = await Category.find().select("name _id image");

    return res.json({
      success: response ? true : false,
      prodCategories: response ? response : "Cannot get product categories",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { pcid } = req.params;
    const response = await Category.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });

    return res.json({
      success: response ? true : false,
      updatedCategory: response ? response : "Cannot update product category",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    // Lấy ra id của category trên params
    const { pcid } = req.params;

    // Lấy ra category dựa vào pcid
    const category = await Category.findById(pcid);
    if (!category) throw new Error("Category not found");

    // update lại tất cả sản phẩm có categoryId trùng với category._id (những sản phẩm nằm trong danh mục vừa lấy bằng pcid) thành null
    await Product.updateMany(
      {
        categoryId: category._id,
      },
      { categoryId: null }
    );

    // Xóa danh mục dựa vào pcid
    const response = await Category.findByIdAndDelete(pcid);

    return res.json({
      success: response ? true : false,
      deletedCategory: response ? response : "Cannot delete product category",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { pcid } = req.params;
    const response = await Category.findById(pcid).populate("products");

    const products = await Product.find({ categoryId: req.params.pcid });

    return res.json({
      success: response ? true : false,
      productCategory: response
        ? { ...response.toObject(), products }
        : "Cannot get product category",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory,
};
