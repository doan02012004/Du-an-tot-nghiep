import { Link } from "react-router-dom"




const Breadcrumb_products = () => {
  return (
    <>
        <section className="breadcrumb-products container lg:mb-[43px] mb-4">
        <ol className="mt-[16px] mb-[16px] flex text-[12px] text-[#6c6d70] lg:text-[14px] lg:mt-[23px] lg:mb-[23px] lg:pl-[15px]">
          <li><Link to="/">Trang chủ</Link></li><span className="ml-1 mr-1">-</span>
          <li><Link to="/product">Shop</Link></li>
          {/* <li><a href="#">Áo Nam</a></li> */}
        </ol>
        <div><hr /></div>
      </section>
    </>
  )
}

export default Breadcrumb_products