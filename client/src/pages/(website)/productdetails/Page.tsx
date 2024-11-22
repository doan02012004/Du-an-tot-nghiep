import Breadcrumb_products from "./_components/Breadcrumb_products";
import Product_information from "./_components/Product_information";
import Slider_product_details from "./_components/Slider_product_details";

// Import Swiper styles
import { useParams } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useProductQuery from "../../../common/hooks/products/useProductQuery";
import Banner from "./_components/Banner";
import Similar_product from "./_components/Similar_product";
import Viewed_products from "./_components/Viewed_products";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../common/contexts/AppContextProvider";

type Props = {}

const ProductDetailsPage = (props: Props) => {
  const { slug } = useParams()
  const query = useProductQuery(slug)
  const { choiceColor, setChoiceColor } = useContext(AppContext);
  useEffect(() => {
    if (query.data) {
      setChoiceColor(query.data.colors[0].name)
    }
  }, [query.data, slug])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [slug])
  return (
    <div>
      <div>
        <Breadcrumb_products product={query.data} />
        {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}
        <section className='lg:mb-8'>
          <section className='container lg:grid lg:grid-cols-2'>
            <Slider_product_details product={query.data} />
            {/* ---------------------------------end product_details------------------------------------------------------- */}
            <Product_information product={query.data} />

          </section>
          {/* ------------------------------------------------------ */}
        </section>
        {/*  */}
        {/* -----------------------------------------------end productdetails------------------------- */}
        <Similar_product />
        {/* ---------------- */}
        <Viewed_products />
        <Banner />

      </div>

    </div>
  )
}

export default ProductDetailsPage