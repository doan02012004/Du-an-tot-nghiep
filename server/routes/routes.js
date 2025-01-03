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
import voucherRouter from "./voucherRouter.js"
import dashboardRouter from "./dashboardRouter.js";
import complaint from "./complaintRoutes.js"
import commentRouter from "./commentRouter.js"
import shipRouter from "./shipRouter.js"
import searchRouter from "./searchRouter.js";
import blogRoutes from "./blogRouter.js";
import categoriesBlog from "./categoryBlogRoutes.js";
import contactRouter from "./contactRouter.js";
import favoriteRouter from "./favoriteRouter.js";
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
  app.use("/api/vouchers",voucherRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/complaint",complaint);
  app.use("/api/comments", commentRouter);
  app.use("/api/vouchers", voucherRouter);
  app.use("/api/ships", shipRouter);
  app.use("/api/searchs", searchRouter);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/categoriesBlog", categoriesBlog);
  app.use("/api/contacts", contactRouter);
  app.use("/api/favorite", favoriteRouter);
};

export default routes;
