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
        {communities.map((x) => {
          return (
            <SwiperSlide>
              <div className="p-8 bg-white rounded-lg flex flex-col items-start space-y-8">
                <img className="object-contain h-[2rem]" src={x.logo} alt="" />
                <div className="md:text-[1.25rem] text-darkgrey h-[9rem]">
                  {x.label}
                </div>
                <div className="flex space-x-3">
                  <img src={x.icon} alt="" />
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
    logo: "/assets/social_recovery/enjin_logo.png",
    label:
      "ZKWallet is one of the most important backnones of Chainlink’s decentralized Mina network, we’re huge fans! Congrats...",
    icon: "/assets/social_recovery/enjin_icon.png",
    name: "Enjin Coin",
    username: "@enjincoin_io",
    href: "https://enjin.io/",
  },
  {
    logo: "/assets/social_recovery/stellar_logo.png",
    label:
      "We’re thrilled to award a grant to @zkwallet from the Mina Community. Supporting them in adding",
    icon: "/assets/social_recovery/stellar_icon.png",
    name: "Stellar",
    username: "@stellar",
    href: "https://stellar.org/",
  },
  {
    logo: "/assets/social_recovery/enjin_logo.png",
    label:
      "ZKWallet is one of the most important backnones of Chainlink’s decentralized Mina network, we’re huge fans! Congrats...",
    icon: "/assets/social_recovery/enjin_icon.png",
    name: "Enjin Coin",
    username: "@enjincoin_io",
    href: "https://enjin.io/",
  },
  {
    logo: "/assets/social_recovery/stellar_logo.png",
    label:
      "We’re thrilled to award a grant to @zkwallet from the Mina Community. Supporting them in adding",
    icon: "/assets/social_recovery/stellar_icon.png",
    name: "Stellar",
    username: "@stellar",
    href: "https://stellar.org/",
  },
  {
    logo: "/assets/social_recovery/stellar_logo.png",
    label:
      "We’re thrilled to award a grant to @zkwallet from the Mina Community. Supporting them in adding",
    icon: "/assets/social_recovery/stellar_icon.png",
    name: "Stellar",
    username: "@stellar",
    href: "https://stellar.org/",
  },
];
