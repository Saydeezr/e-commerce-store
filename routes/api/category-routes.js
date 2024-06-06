const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  })
  .then (categories => {
    res.json(categories);
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error retrieving categories'
    })
  })
});

 // find one category by its `id` value with its associated Products
router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
      if(!categoryData){
        res.status(404).json({ message: 'Category not found'});
        return;
      }

      res.status(200).json(categoryData);

    } catch (error) {
      res.status(500).json(error);
    }
  });

  // create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) { 
    res.status(400).json(error);
  }
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
 try {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
   if(!categoryData){
     res.status(404).json({ message: 'Category not found' });
     return;
  } res.status(200).json(categoryData);

 } catch (error) {
  res.status(500).json(error);
 }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try { 
    const categoryData = Category.destroy({
    where: {
      id: req.params.id}
    }) 
    if(!categoryData){
      res.status(404).json({ message: 'Category not found' });
      return;
   } res.status(200).json(categoryData);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
