import 'antd/dist/reset.css'; // Import CSS của Ant Design
import { useState } from 'react';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import { IColor } from '../../../common/interfaces/Color';
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';
import { Iproduct } from '../../../common/interfaces/product';




const ProductPage = () => {
  const [sortedData, setSortedData] = useState<Iproduct[]>([]);
  const [filter, setFilter] = useState<any>({});

  const query = useProductQuery(undefined, undefined);
  const response = useProductQuery(undefined, filter);

  const data = Object.keys(filter).length > 0 ? response.data : query.data;

  const onHandleSort = (sortOption?: any) => {

    if (!data) {
      console.error("Data is undefined or empty");
      return;
    }
  
    let sorted = [...data];

    switch (sortOption) {
      case "default":
        sorted = [...data];
        break;
      case "new":
        sorted = sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "bestSale":
        console.log("bestSale")
        break;
      case "favourite":
        console.log("favourite")
        break;
      case "high":
        sorted = sorted.sort((a, b) => b.price_new - a.price_new);
        break;
      case "low":
        sorted = sorted.sort((a, b) => a.price_new - b.price_new);
        break;
      default:
        break;
    }
    setSortedData(sorted);
  }

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
            <Top_main_prod sort={onHandleSort} />
            {/* <!-------------------------------------------------------end top-main-prod-----------------------------  --> */}
            <Sub_main_prod  products={sortedData.length > 0 ? sortedData : data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
