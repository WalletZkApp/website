// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ArrowRightIcon from "@mui/icons-material/ArrowForward";
import ArrowLeftIcon from "@mui/icons-material/ArrowBack";
import { useRef, useState } from "react";

export default function SocialRecoveryCarousel() {
  const swiperRef = useRef<SwiperRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const widthPercentage = (100 / communities.length) * (currentIndex + 1);

  return (
    <>
      <Swiper
        ref={swiperRef}
        grabCursor={true}
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        breakpoints={{
          768: {
            slidesPerView: 1.5,
          },
          320: {
            slidesPerView: 1,
          },
        }}
        onSlideChange={(e) => setCurrentIndex(e.realIndex)}
      >
        {communities.map((x, index) => {
          return (
            <SwiperSlide key={x.label + index}>
              <div className="p-8 bg-white rounded-lg flex flex-col items-start h-full">
                {x.logo.substring(0, 1) === "/" ? (
                  <img
                    className="object-contain h-[2rem]"
                    src={x.logo}
                    alt=""
                  />
                ) : (
                  <div className="text-black text-[1.25rem]">{x.logo}</div>
                )}
                <div className="md:text-[1.25rem] text-darkgrey mt-5">
                  {x.label}
                </div>
                <div
                  onClick={() => window.open(x.href)}
                  className="flex space-x-3 mt-auto pt-5 cursor-pointer"
                >
                  <img className="h-[3rem] rounded-full" src={x.icon} alt="" />
                  <div>
                    <div className="font-medium text-black">{x.name}</div>
                    <div className="text-darkgrey">{x.username}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-between mt-8 space-x-5">
        <div className="w-[200px] h-[3px] bg-gray-400 rounded-full overflow-hidden relative">
          <div
            style={{
              width: `${
                currentIndex === communities.length
                  ? widthPercentage + 25
                  : widthPercentage
              }%`,
            }}
            className={`absolute left-0 h-full bg-white transition-all`}
          ></div>
        </div>
        <div className="flex items-center space-x-3">
          <div
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(currentIndex - 1);
              }
            }}
            className="p-2 rounded-full border border-gray-300 cursor-pointer"
          >
            <ArrowLeftIcon sx={{ color: "white" }} />
          </div>
          <div
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(currentIndex + 1);
              }
            }}
            className="p-2 rounded-full border border-gray-300 cursor-pointer"
          >
            <ArrowRightIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>
    </>
  );
}

const communities = [
  {
    logo: "Daria | Everstake 🪶🇺🇦",
    label: `ZkIgnite Cohort 2 from @MinaProtocol is almost under way (2 more sleeps), really excited to see the new proposals. Great too, to see @walletZkApp https://walletzk.app taking shape. Literally just added it to http://zkappsformina.com Have a look here..`,
    icon: "/assets/social_recovery/avatar/avatar_1.png",
    name: "Daria | Everstake",
    username: "@DariaEverstake",
    href: "https://everstake.one/",
  },
  {
    logo: "comMINAty",
    label: `That's fantastic news! 🎉. I have to say that this first look looks incredibly sleek and user-friendly. Friends, what are your thoughts? Let's provide valuable feedback and suggestions to make this app truly exceptional! 💬`,
    icon: "/assets/social_recovery/avatar/avatar_2.png",
    name: "comMINAty",
    username: "@minacryptocom",
    href: "https://minacrypto.com/",
  },
];
