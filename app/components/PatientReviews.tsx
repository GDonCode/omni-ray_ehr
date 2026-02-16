// components/PatientReviews.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  img: string;
  name: string;
  review: string;
  link: string;
}

interface PatientReviewsProps {
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  tt_wellingtons: { className: string };
  cinzel: { className: string };
  levenim: { className: string };
  reviews: Review[];
}

const PatientReviews: React.FC<PatientReviewsProps> = ({
  inter_heading,
  tt_wellingtons_demi,
  tt_wellingtons,
  cinzel,
  levenim,
  reviews
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full lg:w-[95%] mx-auto mt-16 p-4 bg-[#058080]">
      {/* Header */}
      <div className="flex flex-col items-center pb-8 pt-6">
        <p className={`${inter_heading.className} inline-block text-[#8A6B00] bg-[#ffdf20] px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold tracking-wide`}>
          User Reviews
        </p>
        <h3 className={`${tt_wellingtons_demi.className} tracking-wide text-3xl text-[#FAF9F6]`}>
          What our Patients Say
        </h3>
      </div>

      {/* Reviews Slider */}
      <div className="w-[85%] mx-auto pb-6">
        {isClient && (
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="lg:px-4">
                <div className="rounded-sm bg-[#eef3f9] p-4 lg:h-[20rem] h-[27rem] flex flex-col">
                  {/* Review Header */}
                  <div className="flex gap-2 mb-4">
                    <Image 
                      src={review.img} 
                      alt={`${review.name} profile photo`}
                      width={48} 
                      height={48} 
                      className="rounded-full" 
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className={`${tt_wellingtons_demi.className} font-bold`}>
                        {review.name}
                      </p>
                      <div className="text-[#FFD700] text-lg -mt-1">★★★★★</div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <p className={tt_wellingtons.className}>{review.review}</p>
                  </div>

                  {/* Review Footer */}
                  <div className="flex justify-between items-center mt-auto">
                    <a 
                      href={review.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <p className={`${levenim.className} text-sm text-gray-500`}>
                        Verified Patient
                      </p>
                    </a>
                    <a 
                      href={review.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Image 
                        src="/google-logo-removebg-preview.png" 
                        alt="Google Logo" 
                        width={80} 
                        height={80} 
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Stats Section */}
      <div className="flex flex-col items-center mb-6">
        <span className={`${cinzel.className} text-[2.5rem] font-bold text-center text-gray-100`}>
          <span className={`${cinzel.className} text-[2rem] font-bold text-center text-white`}>
            Over
          </span>{' '}
          200,000
        </span>
        <span className={`${tt_wellingtons_demi.className} text-xl text-gray-100 -mt-2 font-semibold tracking-wider`}>
          patients served!
        </span>
      </div>
    </section>
  );
};

export default PatientReviews;