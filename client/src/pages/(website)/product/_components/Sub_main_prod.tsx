import { Iproduct } from '../../../../common/interfaces/product'
import Product from '../../_components/Product'
import Pagination from './Pagination'

type Props = {
  data: {
    products:Iproduct[]
  }
}

const Sub_main_prod = ({ data }: Props) => {



  return (
    <>
      <div className="sub-main-prod mt-3 lg:mt-[26px]">
        <div className="list-products">
          <div className="item-cat-product grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-9">
            {data?.products?.map((product: Iproduct) => (
              
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