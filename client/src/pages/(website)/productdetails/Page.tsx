import { Link, useNavigate, useParams } from "react-router-dom";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Breadcrumb_products from "./_components/Breadcrumb_products";
import Product_information from "./_components/Product_information";
import Slider_product_details from "./_components/Slider_product_details";
import useProductQuery from "../../../common/hooks/products/useProductQuery";
import Banner from "./_components/Banner";
import Similar_product from "./_components/Similar_product";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/AppContextProvider";
import Product_description from './_components/Product_description';
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import { Iproduct } from "../../../common/interfaces/product";
import { Space } from "antd";
import { IColor } from "../../../common/interfaces/Color";

const ProductDetailsPage = () => {
  const { slug } = useParams()
  const query = useProductQuery({ slug: slug })
  const navigate = useNavigate()
  const [product, setProduct] = useState<Iproduct | null>(null)
  const [isLoading,setIsLoading] = useState(true)
  const { setChoiceColor, choiceColor, socket } = useContext(AppContext);
  const [isDelete, setIsDelete] = useState(false)
  useEffect(() => {
    if (query.data) {
      if (query.data?._id) {
        setProduct(query.data)
        setChoiceColor(query.data.colors[0].name)
      }else{
        setIsLoading(false)
      }
    }
  }, [query.data, slug])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [slug])
  useEffect(()=>{
    if(!query.isLoading){
      if(product){
        setIsLoading(false)
      }
    }
  },[query?.isLoading,product])
  // Real-time
  useEffect(() => {
    if (socket?.current) {
      // update sản phẩm
      socket?.current?.on("adminUpdateProduct", (option: { newProduct: Iproduct, attributeId: string }) => {
        setProduct(option.newProduct)
        if(option.newProduct?.slug !== product?.slug){
            navigate(`/productdetails/${option.newProduct.slug}`)
        }
      })
      //Xóa sản phẩm
      socket?.current?.on("deleteProduct", (option: { productId: string | number }) => {
        if (product?._id == option.productId) {
          setProduct(null)
          setIsDelete(true)
        }
      });
      // Real-time xóa size sản phẩm
      socket?.current?.on("deleteSize", (option: { newProduct: Iproduct, productId: string | number, size: string }) => {
        if (product?._id == option.productId) {
          setProduct(option.newProduct)
        }
      })
      // Real-time xóa màu sản phẩm
      socket?.current?.on("deleteColor", (option: { newProduct: Iproduct, productId: string | number, color: IColor }) => {
        if (product?._id == option.productId) {
          setProduct(option.newProduct)
          if (option.color.name == choiceColor) {
            setChoiceColor(option.newProduct.colors[0].name)
          }
        }
      })
    }
  }, [socket, product,choiceColor])
  return (
    <div>
      {isLoading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <LoadingOutlined className="text-7xl text-black font-light" />
        </div>
      ) : (
        product ? (
          <div>
            <Breadcrumb_products product={product} />
            {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}
            <section className='lg:mb-8'>
              <section className='container lg:grid lg:grid-cols-2'>
                <Slider_product_details product={product} />
                {/* ---------------------------------end product_details------------------------------------------------------- */}
                <Product_information product={product} />
              </section>
              {/* ------------------------------------------------------ */}
            </section>
            {/*  */}
            <Product_description product={product} />
            {/* -----------------------------------------------end productdetails------------------------- */}
            {product && <Similar_product categoryId={product?.categoryId?._id ? product?.categoryId?._id : ''} productId={product?._id ? product._id : ''} />}
            {/* ---------------- */}
            {/* <Viewed_products /> */}
            <Banner />
          </div>
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <div className=" max-w-96 flex flex-col items-center ">
              <span className=" block font-semibold text-xl mb-4">404 | Not Found</span>
              <Link to={'/'} className="block btn-md border px-3 py-2 w-max mx-auto">Trang chủ</Link>
            </div>
          </div>
        )
      )
      }
      {isDelete && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center z-[60]">
          <div className="bg-white rounded-md p-5">
            <Space className="mb-4">
              <WarningOutlined className="text-red text-3xl" />
              <span className=" text-base font-semibold">Sản phẩm không tồn tại</span>
            </Space>
            <Link to={'/'} className="block btn-md border px-3 py-2 w-max mx-auto">Trang chủ</Link>
          </div>
        </div>
      )}
    </div >

  )

}

export default ProductDetailsPage