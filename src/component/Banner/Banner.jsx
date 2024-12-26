import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import bannerimg1 from "../../assets/banner1.webp";
import bannerimg2 from "../../assets/banner2.webp";
import bannerimg3 from "../../assets/banner3.webp";

const Banner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="relative">
      {/* Overlay text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 text-center w-[90%] sm:w-[80%]">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-extrabold">
          <span className="text-green-400">
            <Typewriter
              words={["Your Marathon, Our Mission"]}
              loop={0} // 0 means infinite
            />
          </span>
          ...
        </h1>
        <p className="mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-white">
          Power your race from registration through RaceDay with RunSignup’s
          expertly crafted, all-in-one platform for endurance events.
        </p>
      </div>

      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {[bannerimg1, bannerimg2, bannerimg3, bannerimg1].map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] sm:h-[400px] md:h-[600px] lg:h-[800px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="flex justify-center items-center mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={2}
          sm:slidesPerView={3}
          md:slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper h-16"
        >
          {[bannerimg1, bannerimg2, bannerimg3, bannerimg1].map(
            (img, index) => (
              <SwiperSlide
                key={index}
                className="!w-fit cursor-pointer transition-transform hover:scale-110"
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 sm:w-20 h-full object-cover rounded-md"
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
