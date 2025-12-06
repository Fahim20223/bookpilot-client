import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "The Midnight Library",
      description:
        "Between life and death, there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Experience infinite possibilities and discover what makes life worth living.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      gradient: "from-blue-900 via-blue-800 to-blue-700",
    },
    {
      id: 2,
      title: "Atomic Habits",
      description:
        "Tiny changes, remarkable results. Transform your life with proven strategies to build good habits and break bad ones. Learn why small habits make a big difference in achieving your goals.",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      gradient: "from-teal-900 via-teal-700 to-green-600",
    },
    {
      id: 3,
      title: "Project Hail Mary",
      description:
        "A lone astronaut must save the earth from disaster in this unforgettable and propulsive new science fiction thriller. From the bestselling author of The Martian comes an adventure you won't forget.",
      image:
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
      gradient: "from-orange-600 via-red-500 to-yellow-500",
    },
  ];

  return (
    <div className="my-13">
      <div className="relative w-[90%] max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={800}
          loop={true}
          className="rounded-2xl shadow-2xl h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`w-full h-full bg-linear-to-br ${slide.gradient} flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12`}
              >
                {/* Content */}
                <div className="flex-1 text-white pr-0 md:pr-8 max-w-2xl text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-95 leading-relaxed">
                    {slide.description}
                  </p>
                  <a
                    href="#all-books"
                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    Explore All Books
                  </a>
                </div>

                {/* Book Image */}
                <div className="hidden md:block flex-shrink-0 w-48 h-64 lg:w-72 lg:h-96 mt-6 md:mt-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-xl shadow-2xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
        </button>
        <button
          className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* Custom Pagination Dots */}
        <div className="swiper-pagination-custom absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10"></div>

        {/* Custom Pagination Styles */}
        <style jsx>{`
          :global(.swiper-pagination-custom .swiper-pagination-bullet) {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            transition: all 0.3s;
          }
          :global(.swiper-pagination-custom .swiper-pagination-bullet-active) {
            background: white;
            transform: scale(1.25);
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
          }
          @media (min-width: 640px) {
            :global(.swiper-pagination-custom .swiper-pagination-bullet) {
              width: 12px;
              height: 12px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Banner;
