// // const router = require('express').Router();
// // const { Product, Category, Tag, ProductTag } = require('../../models');

// // // The `/api/products` endpoint

// // // GET all products, including their associated Category and Tag data
// // router.get('/', async (req, res) => {
// //   try {
// //     const products = await Product.findAll({
// //       include: [{ model: Category }, { model: Tag, through: ProductTag }],
// //     });
// //     res.status(200).json(products);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // // GET a single product by its `id`, including its associated Category and Tag data
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const product = await Product.findByPk(req.params.id, {
// //       include: [{ model: Category }, { model: Tag, through: ProductTag }],
// //     });

// //     if (!product) {
// //       res.status(404).json({ message: 'No product found with this id!' });
// //       return;
// //     }

// //     res.status(200).json(product);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // // POST to create a new product, including handling of ProductTag associations
// // router.post('/', (req, res) => {
// //   /* req.body example:
// //     {
// //       product_name: "Basketball",
// //       price: 200.00,
// //       stock: 3,
// //       tagIds: [1, 2, 3, 4]
// //     }
// //   */
// //   Product.create(req.body)
// //     .then((product) => {
// //       if (req.body.tagIds && req.body.tagIds.length) {
// //         const productTagIdArr = req.body.tagIds.map((tag_id) => {
// //           return { product_id: product.id, tag_id };
// //         });
// //         return ProductTag.bulkCreate(productTagIdArr);
// //       }
// //       res.status(200).json(product);
// //     })
// //     .then((productTagIds) => res.status(200).json(productTagIds))
// //     .catch((err) => {
// //       console.log(err);
// //       res.status(400).json(err);
// //     });
// // });

// // // PUT to update a product by its `id` with potential ProductTag associations
// // router.put('/:id', (req, res) => {
// //   Product.update(req.body, {
// //     where: { id: req.params.id },
// //   })
// //     .then((product) => {
// //       if (req.body.tagIds && req.body.tagIds.length) {
// //         return ProductTag.findAll({ where: { product_id: req.params.id } })
// //           .then((productTags) => {
// //             const productTagIds = productTags.map(({ tag_id }) => tag_id);
// //             const newProductTags = req.body.tagIds
// //               .filter((tag_id) => !productTagIds.includes(tag_id))
// //               .map((tag_id) => {
// //                 return { product_id: req.params.id, tag_id };
// //               });

// //             const productTagsToRemove = productTags
// //               .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
// //               .map(({ id }) => id);

// //             return Promise.all([
// //               ProductTag.destroy({ where: { id: productTagsToRemove } }),
// //               ProductTag.bulkCreate(newProductTags),
// //             ]);
// //           });
// //       }
// //       return res.json(product);
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //       res.status(400).json(err);
// //     });
// // });

// // // DELETE a product by its `id`
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const result = await Product.destroy({
// //       where: { id: req.params.id },
// //     });

// //     if (!result) {
// //       res.status(404).json({ message: 'No product found with this id!' });
// //       return;
// //     }

// //     res.status(200).json({ message: 'Product deleted successfully' });
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // module.exports = router;
// const router = require('express').Router();
// const { Product, Category, Tag, ProductTag } = require('../../models');

// // The `/api/products` endpoint

// // get all products
// router.get('/', (req, res) => {
//   // find all products
//   // be sure to include its associated Category and Tag data
//   Product.findAll({
//     attributes: ['id', 'product_name', 'price', 'stock'],
//     include: [
//       {
//         model: Category,
//         attributes: ['category_name']
//       },
//       {
//         model: Tag,
//         attributes: ['tag_name']
//       }
//     ]
//   })
//   .then(dbProductData => res.json(dbProductData))
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
//   //================================================
// });

// // get one product
// router.get('/:id', (req, res) => {
//   // find a single product by its `id`
//   // be sure to include its associated Category and Tag data
//   Product.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['id', 'product_name', 'price', 'stock'],
//     include: [
//       {
//         model: Category,
//         attributes: ['category_name']
//       },
//       {
//         model: Tag,
//         attributes: ['tag_name']
//       }
//     ]
//   })
//   .then(dbProductData => {
//     if (!dbProductData) {
//         res.status(404).json({ message: 'No product found with this id' });
//         return;
//     }
//     res.json(dbProductData);
// })
// .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
// });
//   //===============================================
// });

// // create new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
  

//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// // update product
// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       // find all associated tags from ProductTag
//       return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   // delete one product by its `id` value
//   Product.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(dbProductData => {
//     if (!dbProductData) {
//         res.status(404).json({ message: 'No product found with this id' });
//         return;
//     }
//     res.json(dbProductData);
// })
// .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
// });
//   //=====================================
// });

// module.exports = router;
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

  //===========================================
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  //===========================================
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  //===========================================
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that ID.' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  //===========================================
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that ID.' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  //========================================
});

module.exports = router;