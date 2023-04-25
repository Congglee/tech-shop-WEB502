import Product from "../models/product";
import Category from "../models/category";

const createProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 || !req.files)
      throw new Error("Missing inputs");

    const newProduct = await Product.create(req.body);

    await Product.findByIdAndUpdate(
      newProduct._id,
      {
        $push: { images: { $each: req.files.map((el) => el.path) } },
      },
      { new: true }
    );

    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Cannot create new product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const queries = { ...req.query };
    const exculdeFields = ["limit", "sort", "page", "fields"];
    exculdeFields.forEach((item) => delete queries[item]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedItem) => `$${matchedItem}`
    );

    const formatedQueries = JSON.parse(queryString);

    if (queries?.name)
      formatedQueries.name = { $regex: queries.name, $options: "i" };

    let queryCommand = Product.find(formatedQueries);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    } else {
      queryCommand = queryCommand.select("-__v");
    }

    const page = +req.query.page * 1 || 1;
    const limit = +req.query.limit * 1 || 1000000;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    queryCommand.exec(async (err, response) => {
      if (err) throw new Error(err.message);
      const counts = await Product.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ? response : "Cannot get products",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
      path: "categoryId",
      select: "name",
    });

    return res.status(200).json({
      success: product ? true : false,
      productData: product ? product : "Cannot get product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    // Gán categoryId nhập từ req.body vào biến newCategoryId
    const { categoryId: newCategoryId } = req.body;

    // Lấy ra sản phẩm dựa vào pid
    const product = await Product.findById(pid);
    if (!product) throw new Error("Product not found");

    // Lấy ra categoryId cũ của sản phẩm và gán vào oldCategoryId
    const oldCategoryId = product.categoryId;

    // Nếu oldCategoryId có tồn tại và oldCategoryId khác với newCategoryId vừa nhập
    if (oldCategoryId && oldCategoryId.toString() !== newCategoryId) {
      // Lấy ra danh mục cũ dựa vào olaCategoryId và gán vào oldCategory
      const oldCategory = await Category.findById(oldCategoryId);
      // if (!oldCategory) throw new Error("Old category not found");

      // oldCategory.products = oldCategory.products.filter(
      //   (productId) => productId.toString() !== pid
      // );
      // await oldCategory.save();

      // Nếu oldCategory có tồn tại
      if (oldCategory) {
        // Thay đổi lại trường products trong oldCategory bằng sử dụng filter lặp qua mảng products trong oldCategory và lọc ra những productId trong products của oldCategory khác với pid
        oldCategory.products = oldCategory.products.filter(
          (productId) => productId.toString() !== pid
        );

        // Lưu lại oldCategory vào db
        await oldCategory.save();
      } else {
        console.log(`Old category not found: ${oldCategoryId}`);
      }

      // const newCategory = await Category.findById(newCategoryId);
      // if (!newCategory) throw new Error("New category not found");
      // newCategory.products.push(pid);
    }

    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: updatedProduct ? true : false,
      updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = Product.findById(pid);

    if (!deleteProduct) throw new Error("Không tìm thấy sản phẩm");

    await Category.findByIdAndUpdate(deleteProduct.categoryId, {
      $pull: { products: pid },
    });

    const deletedProduct = await Product.findByIdAndDelete(pid);

    return res.status(200).json({
      success: deletedProduct ? true : false,
      deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const uploadImagesProducts = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!req.files) throw new Error("Missing inputs");

    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { images: { $each: req.files.map((el) => el.path) } },
      },
      { new: true }
    );

    return res.status(200).json({
      status: response ? true : false,
      updatedProduct: response ? response : "Cannot upload images product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  uploadImagesProducts,
};
