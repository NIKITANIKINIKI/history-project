import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


interface Category {
  name: string;
  data: EventData[];
}

interface EventData {
  date: string;
  text: string;
}
interface CircleBlockProps {
  event: Category;
}


const SwiperWithButtons: React.FC<CircleBlockProps>= ({event}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Типизация для Swiper
  const handleSwiperUpdate = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      <div className="botton-buttons">
        <button
          className="left-button-swipper"
          onClick={slidePrev}
          disabled={isBeginning}
          style={{ visibility: isBeginning ? "hidden" : "visible" }}
        >
          <svg
            className="left-button"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
          </svg>
        </button>
        <button
          className="right-button-swipper"
          onClick={slideNext}
          disabled={isEnd}
          style={{ visibility: isEnd ? "hidden" : "visible" }}
        >
          <svg
            className="right-button"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="info">
        <Swiper
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          spaceBetween={80}
          slidesPerView={3}
          onSlideChange={handleSwiperUpdate}
          modules={[Navigation]}
          // navigation // Активируем навигацию
        >
          {
            event && event.data.map(el => (
              <SwiperSlide>
            <div className="text-block">
              <label>{el.date}</label>
              <label className="text">
                {el.text}
              </label>
            </div>
          </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  );
};

export default SwiperWithButtons;
