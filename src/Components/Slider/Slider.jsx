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
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper text-center mb-5 rounded-2xl"
      >
        {/* <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.pinimg.com/1200x/97/78/1a/97781a0c73206bff1eab4aa6f8303ae0.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.pinimg.com/1200x/63/21/a4/6321a41a1f3271970fa986a8f281628c.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src="https://i.postimg.cc/fRZ76CP9/amazed-dog-owner-pointing-his-cute-black-pug-smiling-happy-puppy-wearing-costume-white-background.jpg" alt="" /></SwiperSlide> */}

        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-125 object-cover"
              src="https://imgs.search.brave.com/KUE9ZhZB-QU_mB7ATv1trDKS6lr71iFgqOmNwU7bcEQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0Lzk0LzgwLzAz/LzM2MF9GXzE0OTQ4/MDAzMzhfYkRsRjZL/SmNPSE1iQVk5aHY2/bWZ1OXlSRFJCbDlP/SG8uanBn"
              alt=""
            />
            {/* <h2 className="absolute inset-0 flex justify-center mt-6 text-4xl font-extrabold drop-shadow-xl">
              Find Your Furry Friend Today!
            </h2> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-125 object-cover"
              src="https://imgs.search.brave.com/nc64nxWMiorENHwLmPdZwy11dOg3iDgOfm2y0tZeW1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDkv/NDg0Lzk3NS9zbWFs/bC9oYW5kcy1vZi10/aGUtZ2l2ZXItYW5k/LXRoZS1yZWNpcGll/bnQtdG8tZG9uYXRl/LWJsb29kLWJsb29k/LWRvbmF0aW9uLWNv/bmNlcHQtaGVhcnQt/bWVkaWNhbC1zaWdu/LWdpdmUtYmxvb2Qt/c2F2ZS1saWZlLXdv/cmxkLWJsb29kLWRv/bm9yLWRheS1qdW5l/LTE0LTNkLWVwczEw/LWlsbHVzdHJhdGlv/bi12ZWN0b3IuanBn"
              alt=""
            />
            {/* <h2 className="absolute inset-0 flex justify-center mt-6 text-4xl font-extrabold drop-shadow-xl">
              Find Your Furry Friend Today!
            </h2> */}
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-125 object-cover"
              src="https://imgs.search.brave.com/iCG7xWW39uPqy6I5vNZPClr_iYRwDCYcG2sQY_8ZFNQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzM1LzQ3Lzkz/LzM2MF9GXzE2MzU0/NzkzNzlfWlQ0RUx3/SDZ1Vmt6MmhNWGo0/Sm5zOEcwR3QyNTZX/dWwuanBn"
              alt=""
            />
            {/* <h2 className="absolute inset-0 flex items-center pl-15 text-4xl font-extrabold drop-shadow-xl">
              Because Every Pet Deserves Love and Care.
            </h2> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-125 object-cover"
              src="https://imgs.search.brave.com/pA6lSVOxRXu5fML760NXFpBeUqa4iBEXpgzvrgCq1pQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDkv/ODQwLzQ4Ny9zbWFs/bC9hYnN0cmFjdC1h/cm1zLWFuZC1ibG9v/ZC1iYWdzLWZvci1i/bG9vZC1kb25hdGlv/bi1jb25jZXB0LWhl/YXJ0LXNoYXBlZC1i/bG9vZC1jb2xsZWN0/aW9uLWxpbmUtYW5k/LWZvci13b3JsZC1i/bG9vZC1kb25vcnMt/b24tanVuZS0xNC1v/bi1hLXdoaXRlLWFu/ZC1ncmF5LWJhY2tn/cm91bmQtdmVjdG9y/LmpwZw"
              alt=""
            />
            {/* <h2 className="absolute inset-0 flex pl-15 mt-8 text-4xl font-extrabold drop-shadow-xl">
              Adopt, Don’t Shop — Give a Pet a Home.
            </h2> */}
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Slider;
