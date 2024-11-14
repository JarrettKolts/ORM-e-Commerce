// const router = require('express').Router();
// const { Category, Product } = require('../../models');

// // The `/api/categories` endpoint

// // GET all categories with associated Products
// router.get('/', async (req, res) => {
//   try {
//     const categoryData = await Category.findAll({
//       include: [{ model: Product }],
//     });
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET a single category by its `id` with associated Products
// router.get('/:id', async (req, res) => {
//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       include: [{ model: Product }],
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: 'No category found with this id!' });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // POST to create a new category
// router.post('/', async (req, res) => {
//   try {
//     const newCategory = await Category.create(req.body);
//     res.status(201).json(newCategory);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // PUT to update a category by its `id`
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedCategory = await Category.update(req.body, {
//       where: { id: req.params.id },
//     });

//     if (!updatedCategory[0]) {
//       res.status(404).json({ message: 'No category found with this id!' });
//       return;
//     }

//     res.status(200).json({ message: 'Category updated successfully' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE a category by its `id`
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedCategory = await Category.destroy({
//       where: { id: req.params.id },
//     });

//     if (!deletedCategory) {
//       res.status(404).json({ message: 'No category found with this id!' });
//       return;
//     }

//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // be sure to include its associated Products

  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products%%%%%%%%%%%%%%

  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});

router.post("/", (req, res) => {
  // create a new category%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value%%%%%%%%%%%%%%%%%%%

  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: "No Category found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value%%%%%%%%%%%%%%%%%%

  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});

module.exports = router;