import 'antd/dist/reset.css'; // Import CSS của Ant Design
import { useParams, useSearchParams } from 'react-router-dom';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';

const ProductPage = () => {
  const { slug } = useParams();
  const [searchParams,] = useSearchParams();
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")
  const categorySlug = slug || searchParams.get("category"); // Ưu tiên lấy từ slug nếu có
  const sizesUrl = searchParams.get('sizes')
  const colorsUrl= searchParams.get('colors')
  const minPriceUrl = searchParams.get('min_price')
  const maxPriceUrl= searchParams.get('max_price')
  const search = searchParams.get("search")
  const sellOrder = searchParams.get("sell_order")
  const response = useProductQuery(
    {
      dataFilter:{
      search,
      sizes:sizesUrl,
      colors:colorsUrl,
      min_price:minPriceUrl?Number(minPriceUrl):null,
      max_price:maxPriceUrl?Number(maxPriceUrl):null,
      sell_order:sellOrder,
      categorySlug:categorySlug,
      page:page?Number(page):null,
      limit:limit?Number(limit):null,
      active:true
    }}
  );
  console.log(response)

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
            <Sub_main_prod data={response?.data} colorsUrl={colorsUrl} minPrice={minPriceUrl} maxPrice={maxPriceUrl} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
