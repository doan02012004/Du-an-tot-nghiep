import React, { useState } from 'react'
import Pagination from './Pagination'
import Product from '../../_components/Product'
import { Iproduct } from '../../../../common/interfaces/product'

type Props = {
  products: Iproduct[];
}

const Sub_main_prod = ({ products }: Props) => {


  return (
    <>
      <div className="sub-main-prod mt-3 lg:mt-[26px]">
        <div className="list-products">
          <div className="item-cat-product grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-9">
            {products?.map((product: Iproduct, index: number) => (
              <>
                <Product
                  key={index}
                  product={product} 
                 
                />
              </>
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