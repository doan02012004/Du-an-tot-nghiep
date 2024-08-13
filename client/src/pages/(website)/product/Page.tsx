import 'antd/dist/reset.css'; // Import CSS của Ant Design
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';
import useProductQuery from '../../../common/hooks/products/useProductQuery';

const ProductPage = () => {

  const query = useProductQuery();
  console.log(query.data);


  return (
    <div>
      <Breadcrumb_products />
      {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}

      <section className="section-list-products">
        <section className="box-products container lg:flex">
          <Sidebar_prod />
          {/*-------------------------------------end sidebar-prod ---------------------------------------------  */}

          <div className="main-prod lg:mb-[54px]">
            <Top_main_prod />
            {/* <!-------------------------------------------------------end top-main-prod-----------------------------  --> */}
            <Sub_main_prod products={query.data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
