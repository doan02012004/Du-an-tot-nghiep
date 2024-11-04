import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Iproduct } from "../../../../common/interfaces/product";
import { useEffect, useState } from "react";

type Props = {
    product: Iproduct,
    item: Iproduct[],
}

const SimilarProduct = ({ product, item }: Props) => {
    // Lấy categoryId từ sản phẩm hiện tại để lọc sản phẩm tương tự
    const categoryId = product?.categoryId?.name;
    const [relatedProducts, setRelatedProducts] = useState<Iproduct[]>([]);

    useEffect(() => {
        if (categoryId) {
            // Lọc sản phẩm có cùng categoryId và khác với sản phẩm hiện tại
            const filteredProducts = item.filter(
                (items) => items.categoryId?.name === categoryId && items._id !== product._id
            );
            setRelatedProducts(filteredProducts);
        }
    }, [item, categoryId]);

    return (
        <section className="newArrival mb-[18px] lg:mb-10">
            <div className="container">
                <h1 className="text-xl lg:text-3xl font-semibold text-dark tracking-[2px] text-center uppercase mb-[15px] lg:mb-6">Sản phẩm tương tự</h1>
                <div>
                    <div className="w-full">
                        <div className="swiper myArrival relative">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}
                                slidesPerView={5}
                                navigation={{
                                    nextEl: '.arrival-next',
                                    prevEl: '.arrival-prev'
                                }}
                                breakpoints={{
                                    576: {
                                        spaceBetween: 30,
                                        slidesPerView: 5
                                    },
                                    0: {
                                        spaceBetween: 20,
                                        slidesPerView: 2
                                    }
                                }}
                            >
                                {relatedProducts.length > 0 ? (
                                    relatedProducts.map((pro, index) => (
                                        <SwiperSlide key={pro._id || index} className="swiper-slide">
                                            <div>
                                                <div className="h-[236px] lg:h-[350px] w-full relative overflow-hidden mb-4">
                                                    <a href="#" className="block w-full h-full">
                                                        <img src={pro.gallerys[0]?.avatar} alt={pro.name} className="w-full h-full object-cover" />
                                                    </a>
                                                    <span className="absolute top-0 left-0 text-[12px]/[150%] font-semibold py-1 px-3 bg-rose-900 text-white rounded-br-full">
                                                        Best seller
                                                    </span>
                                                    <span className="absolute size-6 lg:size-10 rounded-full top-2 right-2 text-[12px]/[150%] font-semibold bg-black text-white flex justify-center items-center">
                                                        {pro.discount}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between mb-2 lg:mb-3">
                                                    <span className=" cursor-pointer text-sm font-thin text-black ">
                                                        <i className="fa-regular fa-heart" />
                                                    </span>
                                                </div>
                                                <a href="#" className="block text-[12px]/[16px] lg:text-sm hover:text-rose-800 mb-2 lg:mb-[10px]">{pro.name}</a>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <span className=" text-sm font-semibold text-dark lg:text-base">{pro.price_new}đ</span>
                                                        <span className=" text-[10px]/[150%] line-through lg:text-[12px]/[150%]">{pro.price_old}đ</span>
                                                    </div>
                                                    <button className="card-add-to-cart size-5 text-[12px] border-dark border bg-dark rounded-tl-lg rounded-br-lg text-white transition duration-500 ease-in-out hover:bg-white lg:text-base hover:text-black lg:size-8">
                                                        <i className="fa-solid fa-cart-arrow-down" />
                                                    </button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <p>Không có sản phẩm tương tự.</p>
                                )}
                                <span className="arrival-prev hidden absolute z-[15] left-4 top-[40%] cursor-pointer text-[#BCBDC0] text-3xl font-thin lg:block hover:text-dark">
                                    <i className="fa-solid fa-arrow-left-long" />
                                </span>
                                <span className="arrival-next hidden absolute z-[15] right-4 top-[40%] cursor-pointer text-[#BCBDC0] text-3xl font-thin lg:block hover:text-dark">
                                    <i className="fa-solid fa-arrow-right-long" />
                                </span>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SimilarProduct;
