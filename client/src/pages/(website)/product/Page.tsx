import 'antd/dist/reset.css'; // Import CSS của Ant Design
import { useState } from 'react';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import { IColor } from '../../../common/interfaces/Color';
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';




const ProductPage = () => {
  const [filter, setFilter] = useState<any>({});
 
  const query = useProductQuery(undefined, undefined);
  const response = useProductQuery(undefined, filter);

  const data = Object.keys(filter).length > 0 ? response.data : query.data;

  
  const onHandleFilter = (dataFilter?: any) => {
    dataFilter.highlightedColors = dataFilter.highlightedColors.map((col: IColor) => col._id);
    const queryString = new URLSearchParams(dataFilter).toString();
    setFilter(queryString)
  }

  return (
    <div>
      <Breadcrumb_products />
      {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}

      <section className="section-list-products">
        <section className="box-products container lg:flex">
          <Sidebar_prod filter={onHandleFilter} />
          {/*-------------------------------------end sidebar-prod ---------------------------------------------  */}

          <div className="main-prod lg:mb-[54px]">
            <Top_main_prod />
            {/* <!-------------------------------------------------------end top-main-prod-----------------------------  --> */}
            <Sub_main_prod products={data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
