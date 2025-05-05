import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/swiper-bundle.css';
import './VerticalSliderNav.css';

// import SwiperCore, { Mousewheel } from 'swiper';
// SwiperCore.use([Mousewheel]);

const VerticalSliderNav = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="slider-container">
      <div className="nav-buttons">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={i === activeIndex ? 'active' : ''}
          >
            Section {i + 1}
          </button>
        ))}
      </div>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        mousewheel
        className="slider"
      >
        {slides.map((text, i) => (
          <SwiperSlide key={i}>
            <div className="slide-content">{text}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalSliderNav;
