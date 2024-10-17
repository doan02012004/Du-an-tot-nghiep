import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { IGallery } from "./../../../../common/interfaces/gallery";
import useGalleryQuery from "../../../../common/hooks/gallerys/useGalleryQuery";

const Gallery = () => {
  const [gallerys, setGallerys] = useState<IGallery[]>([]);
  const galleryQuery = useGalleryQuery();

  useEffect(() => {
    if (galleryQuery.data) {
      // Lọc các gallery có active: true
      const activeGallerys = galleryQuery?.data?.filter(
        (gallery: IGallery) => gallery.active
      );
      setGallerys(activeGallerys);
    }
  }, [galleryQuery.data]);
  return (
    <section className="gallery  mb-[18px] lg:mb-10">
      <div className="container">
        <h1 className="text-xl lg:text-3xl font-semibold text-dark tracking-[2px] text-center uppercase mb-[10px] lg:mb-5">
          GALLERY
        </h1>
        <div>
          <div className="w-full relative">
            <div className="swiper myArrival">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                breakpoints={{
                  567: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                }}
                className="swiper-wrapper "
              >
                {gallerys.map((gallery) => (
                  <SwiperSlide key={gallery?._id} className="swiper-slide">
                    <div className="h-[236px] lg:h-[350px] w-full relative overflow-hidden mb-4">
                      <a href={gallery?.linkPrd} className="block w-full h-full">
                        <img
                          src={gallery?.imageUrl}
                          alt={gallery?.title}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
