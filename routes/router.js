const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname.replace("routes","") + "public/index.html");
})

// Addresses
const addresses = require('../model/addresses');
router.get('/addresses', async (req, res) => {
  addresses.find({}).then(addresses => {
    return res.json(addresses)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// Categories
const categories = require('../model/categories');
router.get('/categories', async (req, res) => {
  categories.find({}).then(categories => {
    return res.json(categories)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// Customer
const customer = require('../model/customer');
router.get('/customers', async (req, res) => {
  customer.find({}).then(customers => {
    return res.json(customers)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// Order
const order = require('../model/order');
router.get('/orders', async (req, res) => {
  order.find({}).then(orders => {
    return res.json(orders)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// Payment
const payment = require('../model/payment');
router.get('/payments', async (req, res) => {
  payment.find({}).then(payments => {
    return res.json(payments)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// Products
const product = require('../model/product');
router.get('/products', async (req, res) => {
  product.find({}).then(products => {
    return res.json(products)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});
// router.get('/product/:id', (req, res) => {
//   product.findById(req.params.id).then(product => res.json(product)).catch(err => res.status(500).json({ error: err.message }))
// })
// router.post('/product', async (req, res) => {
//   const newProduct = new product({
//     name: req.body.name,
//     price: req.body.price,
//   });
//   try {
//     const saveProduct = await newProduct.save();
//     console.log(saveProduct);
//     res.send("Server received data");
//   }
//   catch (error) {
//     res.json({ message: error.message })
//   }
// });
// router.patch("/product/:id", async (req, res) => {
//   try {
//     await product.updateOne({ _id: req.params.id }, {
//       $set: {
//         price: req.body.price,
//         name: req.body.name
//       }
//     });
//     res.json({ status: 'success' });
//   }
//   catch (err) {
//     res.json({ message: err.message });
//   }
// });
// router.delete("/product/:id", async (req, res) => {
//   try {
//     await product.findByIdAndRemove({ _id: req.params.id });
//     res.json({ status: 'success' });
//   }
//   catch (err) {
//     res.json({ message: err.message });
//   }
// });
// QuanHuyen
const QuanHuyen = require('../model/QuanHuyen');
router.get('/districts', async (req, res) => {
  QuanHuyen.find({}).then(districts => {
    return res.json(districts)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// TinhThanh
const TinhThanh = require('../model/TinhThanh');
router.get('/provinces', async (req, res) => {
  TinhThanh.find({}).then(provinces => {
    return res.json(provinces)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

// TinhThanh
const user = require('../model/user');
router.get('/users', async (req, res) => {
  user.find({}).then(users => {
    return res.json(users)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});
module.exports = router;