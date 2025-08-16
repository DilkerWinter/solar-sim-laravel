import { useState, useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";

const FeatureCarousel = ({ cards, cardsPerPage = 4 }) => {
  const extendedCards = [...cards, ...cards];
  const totalCards = cards.length;
  const maxIndex = totalCards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(cardsPerPage);

  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setCardsToShow(1);
      } else if (width >= 640 && width < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(cardsPerPage);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, [cardsPerPage]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 4000);

    return () => resetTimeout();
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === maxIndex + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePrev = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setIsTransitioning(true);
  };

  const handleNext = () => {
    resetTimeout();
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  return (
    <div className="relative w-full  p-6">
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        aria-label="Before"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        aria-label="Next"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex justify-center"
          style={{
            width: `${(extendedCards.length / cardsToShow) * 100}%`,
            transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
            transform: `translateX(-${(currentIndex * 100) / extendedCards.length}%)`,
          }}
        >
          {extendedCards.map(({ title, description, icon: Icon, color }, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / extendedCards.length}%`, flexShrink: 0 }}
              className="pl-10 pr-10"
            >
              <FeatureCard
                title={title}
                description={description}
                icon={Icon}
                color={color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;
