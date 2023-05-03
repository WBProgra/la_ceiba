import Category from "../models/category.js";


export const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      where: {
        active: true,
      },
    });

    res.json(category);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al obtener las categorías desde el backend" });
  }
};


export const postCategory = async (req, res) => {
  try {
    const { category, description } = req.body;

    const _category = await Category.create({
      category,
      description,
    });

    res.json({ message: "Categoría creada" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al crear la categoría en el backend" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const category = await Category.findOne({
      where: {
        CategoryID: id,
        active: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Error al eliminar la categoría" });
    }

    await category.update({ active: false });

    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar la categoría en el backend" });
  }
};

export const viewCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: {
        CategoryID: id,
        active: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al visualizar la categoría en el backend" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, description } = req.body;

    const _category = await Category.findOne({
      where: {
        CategoryID: id,
        active: true,
      },
    });

    if (!_category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await _category.update({ category, description });

    res.json({ message: "Categoría actualizada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la categoría en el backend" });
  }
}
