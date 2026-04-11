import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-6 lg:my-10">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[600px] min-h-[300px]">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=2000"
              alt="Donate Blood"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg mb-4 text-center">
                Give the Gift of Life
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md text-center max-w-2xl text-gray-200">
                Your single blood donation can save up to 3 lives. Be someone's lifeline today.
              </p>
            </div>
          </div>
        </SwiperSlide>
        
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[600px] min-h-[300px]">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
              alt="Care and Love"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg mb-4 text-center text-red-500">
                Every Drop Counts
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md text-center max-w-2xl text-gray-200">
                Join our community of daily heroes. A few minutes of your time creates a lifetime of gratitude.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[600px] min-h-[300px]">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000"
              alt="Medical Support"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg mb-4 text-center">
                Share Hope, Donate Blood
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md text-center max-w-2xl text-gray-200">
                Hospitals are constantly in need of rare and common blood types. Register as a donor right now.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
