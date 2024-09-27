import { Iproduct } from '../../../../common/interfaces/product'
import Product from '../../_components/Product'
import Pagination from './Pagination'

type Props = {
  products: Iproduct[];
}

const Sub_main_prod = ({ products }: Props) => {



  return (
    <>
      <div className="sub-main-prod mt-3 lg:mt-[26px]">
        <div className="list-products">
          <div className="grid grid-cols-2 gap-4 item-cat-product lg:grid-cols-4 lg:gap-9">
            {products?.map((product: Iproduct) => (
              
                <Product
                  key={product._id}
                  product={product} 
                 
                />
            ))}
            {/* -----------------end products ---------------------------------------------*/}
          </div>
          {/* ------------------------------------------------------------------------------- */}
          <Pagination />
        </div>
      </div>
    </>
  )
}

export default Sub_main_prod