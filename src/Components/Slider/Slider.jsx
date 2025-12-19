import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";




// import "./styles.css";

const Slider = () => {
  return (
    <div className="mx-20">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper text-center mb-5 rounded-2xl">
        {/* <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.pinimg.com/1200x/97/78/1a/97781a0c73206bff1eab4aa6f8303ae0.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.pinimg.com/1200x/63/21/a4/6321a41a1f3271970fa986a8f281628c.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.postimg.cc/fRZ76CP9/amazed-dog-owner-pointing-his-cute-black-pug-smiling-happy-puppy-wearing-costume-white-background.jpg" alt="" /></SwiperSlide> */}
        


        <SwiperSlide>
  <div className="relative">
    <img
      className="w-full h-125 object-cover"
      src="https://i.pinimg.com/1200x/97/78/1a/97781a0c73206bff1eab4aa6f8303ae0.jpg"
      alt=""
    />
    <h2 className="absolute inset-0 flex justify-center mt-6 text-4xl font-extrabold drop-shadow-xl">
      Find Your Furry Friend Today!
    </h2>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="relative">
    <img
      className="w-full h-125 object-cover"
      src="https://i.pinimg.com/1200x/63/21/a4/6321a41a1f3271970fa986a8f281628c.jpg"
      alt=""
    />
    <h2 className="absolute inset-0 flex pl-15 mt-8 text-4xl font-extrabold drop-shadow-xl">
      Adopt, Don’t Shop — Give a Pet a Home.
    </h2>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="relative">
    <img
      className="w-full h-125 object-cover"
      src="https://i.postimg.cc/fRZ76CP9/amazed-dog-owner-pointing-his-cute-black-pug-smiling-happy-puppy-wearing-costume-white-background.jpg"
      alt=""
    />
    <h2 className="absolute inset-0 flex items-center pl-15 text-4xl font-extrabold drop-shadow-xl">
      Because Every Pet Deserves Love and Care.
    </h2>
  </div>
</SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Slider;
