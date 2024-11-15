import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "../pages/(admin)/LayoutAdmin";
import PageSignin from "../pages/(website)/Auth/Signin/Page";
import PageSignup from "../pages/(website)/Auth/Signup/Page";
import LayoutWebsite from "../pages/(website)/LayoutWebsite";
import PageBlog from "../pages/(website)/Blog/BlogPage/Page";
import PageDetail from "../pages/(website)/Blog/BlogDetail/Page";
import HomePage from "../pages/(website)/home/HomePage";
import MyInformation from "../pages/(website)/my-information/Page";
import Account from "../pages/(website)/my-information/information/Page";
import CartPage from "../pages/(website)/cart/CartPage";
import OrderPage from "../pages/(website)/order/OrderPage";
import ThanksPage from "../pages/(website)/thanks/Page";
import ProductPage from "../pages/(website)/product/Page";
import ProductDetailsPage from "../pages/(website)/productdetails/Page";
import AdminProduct from "../pages/(admin)/product/Page";
import ListProduct from "../pages/(admin)/product/list/Page";
import AddProductAdmin from "../pages/(admin)/product/add/Page";
import LayoutColor from "../pages/(admin)/color/Page";
import CategoriesPage from "../pages/(admin)/categories/Page";

import CategoriesForm from '../pages/(admin)/categories/_components/CategoryForm'
import PageAuthAdmin from '../pages/(admin)/users/Page'
import ListUser from '../pages/(admin)/users/_components/ListUser'
import ViewProductAdmin from '../pages/(admin)/product/view/Page'
import ChatWidget from '../pages/(admin)/chatwiget/Page'
import AddressList from '../pages/(website)/my-information/address/Page'
import BannerPage from "../pages/(admin)/banner/Page";
import ListBanner from "../pages/(admin)/banner/_components/ListBanner";
import GalleryPage from "../pages/(admin)/gallery/Page";
import ListGallery from "../pages/(admin)/gallery/_components/ListGallery";
import OrdersPage from "../pages/(admin)/order/Page";
import OrderList from "../pages/(admin)/order/_components/OrderList";
import OrderDetails from "../pages/(admin)/order/_components/OrderDetails";
import OrderManager from "../pages/(website)/my-information/order-manager/Page";
import BrandsPage from "../pages/(admin)/brands/Page";
import BrandsForm from "../pages/(admin)/brands/_components/BrandForm";
import HistoryUpdateUser from "../pages/(admin)/users/_components/HistoryUpdateUser";
import VouchersPage from "../pages/(admin)/vouchers/Page";
import VoucherList from "../pages/(admin)/vouchers/_components/VoucherList";
import VoucherAdd from "../pages/(admin)/vouchers/_components/VoucherAdd";
import VoucherEdit from "../pages/(admin)/vouchers/_components/VoucherEdit";
import PageComplaint from "../pages/(admin)/complaint/Page";
import ComplaintList from "../pages/(admin)/complaint/_components/ComplaintList";
import ComplaintEdit from "../pages/(admin)/complaint/_components/ComplaintEdit";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<HomePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="productdetails/:slug" element={<ProductDetailsPage />} />
        <Route path="signin" element={<PageSignin />} />
        <Route path="signup" element={<PageSignup />} />
        <Route path="blog" element={<PageBlog />} />
        <Route path="blogdetail" element={<PageDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="thanks" element={<ThanksPage />} />
        <Route path="customer" element={<MyInformation />}>
          <Route path="infor" element={<Account />} />
          <Route path="order-manager" element={<OrderManager />} />
          <Route path="address_list" element={<AddressList />} />
        </Route>
      </Route>
      <Route path="admin" element={<LayoutAdmin />}>
      <Route path="complaint" element={<PageComplaint />}>
          <Route index element={<ComplaintList />}/>
          <Route path="admin/complaint/:id" element={<ComplaintEdit />}/>
        </Route>
        <Route path="vouchers" element={<VouchersPage />}>
          <Route index element={<VoucherList />}/>
          <Route path="add" element={<VoucherAdd />}/>
          <Route path="/admin/vouchers/:id" element={<VoucherEdit />} />
        </Route>
        <Route path="orders" element={<OrdersPage/>}>
          <Route index element={<OrderList />}/>
          <Route path="details/:id" element={<OrderDetails />}/>
        </Route>
        <Route path="products" element={<AdminProduct />}>
          <Route index element={<ListProduct />} />
          <Route path="add" element={<AddProductAdmin />} />
          <Route path="view/:slug" element={<ViewProductAdmin />} />
        </Route>
        <Route path='colors' element={<LayoutColor />} />
        <Route path='categories' element={<CategoriesPage />} />
        <Route path='categories/add' element={<CategoriesForm />} />
        <Route path='categories/edit/:id' element={<CategoriesForm />} />
        <Route path='brands' element={<BrandsPage />} />
        <Route path='brands/add' element={<BrandsForm />} />
        <Route path='brands/edit/:id' element={<BrandsForm />} />
        <Route path='chat' element={<ChatWidget />} />
        <Route path='auth' element={<PageAuthAdmin />} >
          <Route index element={<ListUser />} />
          <Route path='historyupdate' element={<HistoryUpdateUser />} />
        </Route>
        <Route path="banners" element={<BannerPage />}>
          <Route index element={<ListBanner />} />
        </Route>
        <Route path="gallerys" element={<GalleryPage />}>
          <Route index element={<ListGallery />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;