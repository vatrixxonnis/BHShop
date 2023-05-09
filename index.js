const express = require('express');
const app = express();
const port = 3100;

app.use(express.static('public'));

const morgan = require("morgan");
app.use(morgan("combined"));

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

const db = require('./config/db');
db.connect();

const routes = require('./routes/router.js')
const productRoutes = require('./routes/productRouter.js')
const userRoutes = require('./routes/userRouter.js')
const addressRoutes = require('./routes/addressRouter.js')
const categoryRoutes = require('./routes/categoryRouter.js')
const customerRoutes = require('./routes/customerRouter.js')
const orderRoutes = require('./routes/orderRouter.js')
const paymentRoutes = require('./routes/paymentRouter.js')

app.use('/', routes)
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/addresses', addressRoutes)
app.use('/categories', categoryRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)
app.use('/payments', paymentRoutes)

app.listen(port, () => {
  console.log(`My server is listening on port ${port}`)
})