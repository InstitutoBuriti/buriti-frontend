// src/components/ImageCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ImageCarousel = ({ slides }) => (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 5000 }}
    loop
    className="w-full h-64 sm:h-96 lg:h-[600px]"
  >
    {slides.map((slide, idx) => (
      <SwiperSlide key={idx} className="h-full">
        <Link to={slide.link} className="block h-full">
          <img
            src={slide.imageUrl}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ImageCarousel;

