import 'antd/dist/reset.css'; // Import CSS của Ant Design
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import { Iproduct } from '../../../common/interfaces/product';




const ProductPage = () => {

  const query = useProductQuery();
  console.log(query.data);
  
  const onHandleFilter = (dataFilter?: any) => {

    console.log(dataFilter);

    const response = useProductQuery(undefined,dataFilter);
    console.log(response.data);


  }

  // {
  //   highlightedSize: 'M',
  //   highlightedColors: [ 'yellow', 'pink', 'red' ],
  //   price: [ 3761461, 10000000 ]
  // }

  // {
  //   _id: '66ba282f566ca9a5ea34ac8c',
  //   name: 'Áo phông',
  //   categoryId: {
  //     _id: '66ae64d3a6a0030915c4dc20',
  //     name: 'Áo bà ba',
  //     slug: 'ao-ba-ba',
  //     status: 'Hoạt động',
  //     createdAt: '2024-08-03T17:11:47.501Z',
  //     updatedAt: '2024-08-03T17:34:48.330Z'
  //   },
  //   price_old: 100000,
  //   price_new: 50000,
  //   discount: 50,
  //   gallerys: [
  //     {
  //       avatar: 
  //         'http://res.cloudinary.com/dfnltn7tj/image/upload/v1723475969/dcfi8hhkuwnrrsk635qa.png',
  //       name: 'ĐEN',
  //       items: [

  //           'http://res.cloudinary.com/dfnltn7tj/image/upload/v1723475981/nvbwzecutkjo1mlu85be.png', 
  //           'http://res.cloudinary.com/dfnltn7tj/image/upload/v1723475982/tjpo4cojkr2jcojg5jy4.png'
  //       ],
  //       _id: '66ba282f566ca9a5ea34ac8d'
  //     }
  //   ],
  //   sizes: [ 'S', 'M', 'L' ],
  //   colors: [
  //     {
  //       _id: '66ba25c9566ca9a5ea34ac79',
  //       name: 'ĐEN',
  //       background: '#000000',
  //       createdAt: '2024-08-12T15:10:01.916Z',
  //       updatedAt: '2024-08-12T15:10:01.916Z'
  //     }
  //   ],
  //   gender: 'unisex',
  //   description: '<p>Mô tả sản phẩm</p>',
  //   featured: false,
  //   status: true,
  //   attributes: [
  //     {
  //       size: 'S',
  //       color: 'ĐEN',
  //       instock: 23,
  //       _id: '66ba282f566ca9a5ea34ac8e'
  //     },
  //     {
  //       size: 'M',
  //       color: 'ĐEN',
  //       instock: 55,
  //       _id: '66ba282f566ca9a5ea34ac8f'
  //     },
  //     {
  //       size: 'L',
  //       color: 'ĐEN',
  //       instock: 66,
  //       _id: '66ba282f566ca9a5ea34ac90'
  //     }
  //   ],
  //   purchases: 0,
  //   comment: [],
  //   createdAt: '2024-08-12T15:20:15.207Z',
  //   updatedAt: '2024-08-12T15:20:15.207Z'
  // },




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
            <Sub_main_prod products={query.data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
