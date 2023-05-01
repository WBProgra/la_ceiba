import Category from "../models/category.js";
import Product from "../models/product.js";
import ProductsCategory from "../models/protucts_category.js";

// GET
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        active: true,
      },
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting request to backend D:" });
  }
};

// POST
export const postProduct = async (req, res) => {
  try {
    const { name, description, quantity, price_cost, price_sale, existence } =
      req.body;

    const product = await Product.create({
      name,
      description,
      quantity,
      price_cost,
      price_sale,
      existence,
    });

    res.json({ message: "Product created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting request to backend" });
  }
};

// // DELETE
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        ProductID: id,
        active: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Error delete" });
    }

    await product.update({ active: false });

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting request to backend D:" });
  }
};

// VIEW
export const viewProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        ProductID: id,
        active: true,
      },
    });

    // foreing key
    const product_category = await ProductsCategory.findAll({
      where: {
        ProductID: id,
      },
      include: Category,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const category = product_category.map((item) => {
      const category_ = item.toJSON();
      return {
        value: category_.Category.CategoryID,
        label: category_.Category.category,
      };
    });

    const product_JSON = product.toJSON();
    product_JSON.category = category;

    res.json(product_JSON);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting request to backend D:" });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      quantity,
      expiration_date,
      supplier,
      nit_supplier,
      price_cost,
      price_sale,
      existence,
    } = req.body;

    const product = await Product.findOne({
      where: {
        ProductID: id,
        active: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Error update" });
    }

    await product.update({
      name,
      description,
      quantity,
      expiration_date,
      supplier,
      nit_supplier,
      price_cost,
      price_sale,
      existence,
    });

    res.json({ message: "Product updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting request to backend D:" });
  }
};
