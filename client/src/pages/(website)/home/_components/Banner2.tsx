import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { IBanner } from "./../../../../common/interfaces/banner";
import useBannerQuery from "../../../../common/hooks/banners/useBannerQuery";

const Banner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const bannerQuery = useBannerQuery();

  useEffect(() => {
    if (bannerQuery.data) {
      // Lọc các banner có active: true
      const activeBanners = bannerQuery?.data?.filter(
        (banner: IBanner) => banner.active
      );
      setBanners(activeBanners);
    }
  }, [bannerQuery.data]);

  return (
    <section className="banner">
      <div className="container">
        {/* Swiper */}
        <div className="swiper myBanner overflow-hidden rounded-tl-[32px] rounded-br-[32px] lg:rounded-tl-[80px] lg:rounded-br-[80px] mb-[18px] lg:mb-10">
          <Swiper
            className="swiper-wrapper rounded-tl-[32px] rounded-br-[32px] lg:rounded-tl-[80px] lg:rounded-br-[80px]"
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            {banners.map((banner) => (
              <SwiperSlide
                key={banner?._id}
                className="swiper-slide w-full h-[396px] lg:h-[508px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] lg:rounded-tl-[80px] lg:rounded-br-[80px]"
              >
                <a href={banner?.linkPrd} className="block w-full h-full">
                  <img
                    src={banner?.imageUrl}
                    alt={banner?.title}
                    className="object-cover w-full h-full"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;