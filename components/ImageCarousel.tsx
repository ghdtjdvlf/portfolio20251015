"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageLightbox } from "./ImageLightbox";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  className?: string;
}

export const ImageCarousel = ({ images, className = "" }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };

  const handleClick = () => {
    if (!isDragging) {
      setLightboxOpen(true);
    }
  };

  if (images.length === 0) return null;

  const getPrevIndex = () => {
    return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Images */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }

                  // Reset isDragging after a small delay to prevent click event
                  setTimeout(() => setIsDragging(false), 100);
                }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handleClick}
              >
                {images[currentIndex].src.startsWith("http") ? (
                  <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-xl"
                    draggable={false}
                  />
                ) : (
                  <span className="placeholder-text">{images[currentIndex].alt}</span>
                )}

                {/* Preview images on both sides - only show if multiple images */}
                {images.length > 1 && (
                  <>
                    {/* Previous image preview */}
                    <div className="absolute -left-full inset-y-0 flex items-center justify-center opacity-80 pointer-events-none">
                      {images[getPrevIndex()].src.startsWith("http") ? (
                        <img
                          src={images[getPrevIndex()].src}
                          alt={images[getPrevIndex()].alt}
                          className="max-w-full max-h-full object-contain rounded-xl"
                          draggable={false}
                        />
                      ) : (
                        <span className="placeholder-text">{images[getPrevIndex()].alt}</span>
                      )}
                    </div>

                    {/* Next image preview */}
                    <div className="absolute -right-full inset-y-0 flex items-center justify-center opacity-80 pointer-events-none">
                      {images[getNextIndex()].src.startsWith("http") ? (
                        <img
                          src={images[getNextIndex()].src}
                          alt={images[getNextIndex()].alt}
                          className="max-w-full max-h-full object-contain rounded-xl"
                          draggable={false}
                        />
                      ) : (
                        <span className="placeholder-text">{images[getNextIndex()].alt}</span>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-500 dark:bg-blue-400 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={currentIndex}
      />
    </>
  );
};
