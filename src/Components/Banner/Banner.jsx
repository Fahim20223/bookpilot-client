import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl max-w-7xl mx-auto">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full h-full bg-linear-to-br ${slide.gradient} flex items-center justify-between px-8 md:px-20 py-12`}
          >
            {/* Content */}
            <div className="flex-1 text-white pr-8 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg animate-fade-in">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed animate-fade-in-delay">
                {slide.description}
              </p>
              <a
                href="#all-books"
                className="inline-block px-8 py-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-delay-2"
              >
                Explore All Books
              </a>
            </div>

            {/* Book Image */}
            <div className="hidden md:block flex-shrink-0 w-72 h-96 animate-fade-in-right">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl shadow-2xl hover:scale-105 hover:-translate-y-2 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125 ring-2 ring-white/50"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.2s backwards;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s backwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out 0.3s backwards;
        }
      `}</style>
    </div>
  );
};
export default Banner;
