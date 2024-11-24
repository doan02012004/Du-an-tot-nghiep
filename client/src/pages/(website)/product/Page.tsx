import 'antd/dist/reset.css'; // Import CSS của Ant Design
import { useLocation, useSearchParams } from 'react-router-dom';
import { useFilterParams } from '../../../common/hooks/products/useFilter';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';


const ProductPage = () => {
  const location = useLocation();
  const { setFilterParams, getFiltersFromUrl } = useFilterParams();
  const data = getFiltersFromUrl();
  const params = setFilterParams(data);
  const [searchParams] = useSearchParams();
  const slugCategory = searchParams.get("category");
  
  const response = useProductQuery(undefined, location.search === '' ? undefined : params?.toString(),slugCategory);

  return (
    <div>
      <Breadcrumb_products />
      {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}
      <section className="section-list-products">
        <section className="box-products container lg:flex">
          <Sidebar_prod />
          {/*-------------------------------------end sidebar-prod ---------------------------------------------  */}
          <div className="main-prod lg:mb-[54px]">
            <Top_main_prod  />
            {/* <!-------------------------------------------------------end top-main-prod-----------------------------  --> */}
            <Sub_main_prod data={response?.data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
