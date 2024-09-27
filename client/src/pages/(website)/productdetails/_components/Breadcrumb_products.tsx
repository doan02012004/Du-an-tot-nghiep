import { Iproduct } from "../../../../common/interfaces/product"

type Props = {
  product:Iproduct
}

const Breadcrumb_products = ({product}: Props) => {
  console.log(product)
  return (
    <>
        {product && (
                  <section className="breadcrumb-products container lg:mb-[43px] mb-4">
                  <ol className="mt-[16px] mb-[16px] flex text-[12px] text-[#6c6d70] lg:text-[14px] lg:mt-[23px] lg:mb-[23px] lg:pl-[15px]">
                  <li><a href="#">Trang chủ</a></li><span className="ml-1 mr-1">-</span>
                  <li><a href="#">{product?.categoryId?.name}</a></li><span className="ml-1 mr-1">-</span>
                  <li><a href="#">{product?.name}</a></li>
                  </ol>
                  <div><hr /></div>
          </section>
        )}
    </>
  )
}

export default Breadcrumb_products