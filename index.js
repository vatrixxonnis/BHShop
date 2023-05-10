const express = require("express");
const app = express();
const port = 3100;
var crypto = require("crypto");
const morgan = require("morgan");
app.use(express.static("public"));
app.use(morgan("combined"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

const db = require("./config/db");
db.connect();

const routes = require("./routes/router.js");
const productRoutes = require("./routes/productRouter.js");
const userRoutes = require("./routes/userRouter.js");
const addressRoutes = require("./routes/addressRouter.js");
const categoryRoutes = require("./routes/categoryRouter.js");
const customerRoutes = require("./routes/customerRouter.js");
const orderRoutes = require("./routes/orderRouter.js");
const paymentRoutes = require("./routes/paymentRouter.js");
const reviewRoutes = require("./routes/reviewRouter");
const couponRouter = require("./routes/couponRouter");
app.use("/", routes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/categories", categoryRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/coupons", couponRouter);
// Import middleware
// const accessLogsMiddleware = require("./middleware/accessLog");
// const salt = crypto.randomBytes(16).toString("hex"); // create salt
// const hash = crypto
//   .pbkdf2Sync("BHShop123@", salt, 1000, 64, "sha512")
//   .toString("hex");

// console.log("Salt:", salt);
// console.log("Hash:", hash);

// Apply middleware
// app.use(accessLogsMiddleware);
app.listen(port, () => {
  console.log(`My server is listening on port ${port}`);
});
