const express = require("express");
const app = express();
const port = 3100;
var crypto = require("crypto");
const morgan = require("morgan");
app.use(express.static("public"));
app.use(morgan("combined"));

const cors = require("cors");
app.use(
  cors({
    // Allow follow-up middleware to override this CORS for options
    preflightContinue: true,
  })
);

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

// const db = require("./config/db");
// db.connect();

const routes = require("./routes/router.js");
const productRoutes = require("./routes/productRouter.js");
const userRoutes = require("./routes/userRouter.js");
const addressRoutes = require("./routes/addressRouter.js");
const categoryRoutes = require("./routes/categoryRouter.js");
const customerRoutes = require("./routes/customerRouter.js");
const orderRoutes = require("./routes/orderRouter.js");
const paymentRoutes = require("./routes/paymentRouter.js");
const reviewRoutes = require("./routes/reviewRouter");
const couponRoutes = require("./routes/couponRouter");
const newsRoutes = require("./routes/newsRouter.js");
// const ueldailyRouter = require("./routes/ueldailyRouter.js");
const glowyRouter = require("./routes/glowyRouter.js");

app.use("/", routes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/categories", categoryRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/newsletters", newsRoutes);
app.use("/coupons", couponRoutes);
// app.use("/ueldaily", ueldailyRouter);
app.use("/glowy", glowyRouter);
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
  console.log(
    `My server is listening on port ${port}. The address is http://localhost:${port}`
  );
});

// Prevent Render from sleeping
const selfPing = require('./middleware/self-ping.js');
const cron = require('node-cron');
const preventSleep = cron.schedule('5,19,33,47,1 * * * *', () => {
  selfPing.handler();
},{
  scheduled: false,
});

preventSleep.start();
