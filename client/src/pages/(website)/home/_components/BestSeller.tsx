import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import { Iproduct } from "../../../../common/interfaces/product";
import useProductSlider from "../../../../common/hooks/products/useProductSlider";
import Product from "../../_components/Product";
const BestSeller = () => {
  const [products, setProducts] = useState([] as Iproduct[]);
  const [gender, setGender] = useState<"male" | "female">("female");
  const productQuery = useProductSlider({ _gender: gender, _isSale: 50 });
  useEffect(() => {
    if (Array.isArray(productQuery?.data)) {
      setProducts(productQuery.data);
    } else {
      setProducts([]);
    }
  }, [productQuery?.data]);

  return (
    <section className="newArrival mb-[18px] lg:mb-16">
      <div className="container">
        <h1 className="text-xl lg:text-3xl font-semibold text-dark tracking-[2px] text-center uppercase mb-[10px] lg:mb-5">
          BEST SELLER | SALE 50% TOÀN BỘ SP
        </h1>
        <div>
          <div className="mx-auto w-max">
            <ul className="tabs-btn flex items-center gap-8 mb-4 lg:mb-[28px]">
              <li
                onClick={() => gender == "male" && setGender("female")}
                className={` ${gender == "female" && "border-b-2 border-b-black"
                  } cursor-pointer text-dark text-base lg:text-xl pb-2 lg:pb-0 `}
              >
                Fendi-Shop Women
              </li>
              <li
                onClick={() => gender == "female" && setGender("male")}
                className={` ${gender == "male" && "border-b-2 border-b-black"
                  } cursor-pointer text-dark text-base lg:text-xl pb-2 lg:pb-0 `}
              >
                Fendi-Shop Men
              </li>
            </ul>
          </div>
          <div className="w-full">
            <div className="relative swiper myArrival">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={5}
                navigation={{
                  nextEl: ".arrival-next",
                  prevEl: ".arrival-prev",
                }}
                breakpoints={{
                  576: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                  },
                  0: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                  },
                }}
              >
                {products?.map((product: Iproduct, i: number) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <Product product={product} discount={50} />
                  </SwiperSlide>
                ))}
                <span className=" arrival-prev hidden absolute z-[15] left-4 top-[40%] cursor-pointer  text-[#BCBDC0] text-3xl font-thin lg:block hover:text-dark">
                  <i className="fa-solid fa-arrow-left-long" />
                </span>
                <span className="  arrival-next hidden absolute z-[15] right-4 top-[40%] cursor-pointer text-[#BCBDC0] text-3xl font-thin lg:block hover:text-dark">
                  <i className="fa-solid fa-arrow-right-long" />
                </span>
              </Swiper>
            </div>
          </div>
          {/* <div className="mx-auto mt-5 w-max">
            <a href="#" className="block">
              <span className="block px-4 py-2 border btn-lg lg:py-3 lg:px-6 border-dark">
                Xem tất cả
              </span>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;