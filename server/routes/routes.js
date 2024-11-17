import addressRouter from "./addressRouter.js";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";
import categoryouter from "./categoryRouter.js";
import colorRouter from "./colorRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";
import chatRouter from "./chatRouter.js";
import bannerRouter from "./bannerRouter.js";
import galleryRouter from "./galleryRouter.js";
import brandRouter from "./brandRouter.js"
import commentRouter from "./commentRouter.js"
const routes = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/users", userRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/categories", categoryouter);
  app.use("/api/colors", colorRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/chats", chatRouter);  
  app.use("/api/banners", bannerRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/gallerys", galleryRouter);
  app.use("/api/comments", commentRouter);
};

export default routes;
