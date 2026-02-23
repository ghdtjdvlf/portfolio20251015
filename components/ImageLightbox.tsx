"use client";

import React, { useState, useEffect } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images?: ImageItem[];
  initialIndex?: number;
  imageSrc?: string;
  imageAlt?: string;
}

export const ImageLightbox = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  imageSrc,
  imageAlt = "Expanded image",
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [scale, setScale] = useState(0.84);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);

  // Update currentIndex when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Handle single image mode
  const isSingleImage = !images;
  const displayImages = images || [{ src: imageSrc || "", alt: imageAlt }];


  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = displayImages.length - 1;
      if (newIndex >= displayImages.length) newIndex = 0;
      return newIndex;
    });
  };

  const getPrevIndex = () => {
    return currentIndex === 0 ? displayImages.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === displayImages.length - 1 ? 0 : currentIndex + 1;
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        paginate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, displayImages.length]);

  // Wheel zoom
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prevScale) => {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = prevScale + delta;
        return Math.min(Math.max(newScale, 0.5), 5);
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // Reset scale when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(0.84);
    }
  }, [isOpen]);

  // Touch handlers for pinch zoom
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      if (distance !== null) {
        const delta = (distance - lastTouchDistance) / 100;
        setScale((prevScale) => {
          const newScale = prevScale + delta;
          return Math.min(Math.max(newScale, 0.5), 5);
        });
        setLastTouchDistance(distance);
      }
    }
  };

  const handleTouchEnd = () => {
    setLastTouchDistance(null);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 md:p-1"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons - only show for multiple images */}
          {!isSingleImage && displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                className="absolute left-2 md:left-4 z-20 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer touch-manipulation"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                className="absolute right-2 md:right-4 z-20 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer touch-manipulation"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image slider */}
          <div className="flex items-center justify-center w-full h-full md:w-auto md:h-auto" onClick={(e) => e.stopPropagation()}>
            {displayImages && displayImages[currentIndex] && (
              <>
                {displayImages[currentIndex].src ? (
                  <img
                    src={displayImages[currentIndex].src}
                    alt={displayImages[currentIndex].alt}
                    className="w-screen h-screen md:max-w-[90vw] md:max-h-[85vh] md:w-auto md:h-auto object-contain md:rounded-lg md:shadow-2xl"
                    draggable={false}
                    style={{ transform: `scale(${scale})` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8">
                    <span className="text-gray-400">{displayImages[currentIndex].alt}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Indicators - only show for multiple images */}
          {!isSingleImage && displayImages.length > 1 && (
            <div className="absolute bottom-4 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all touch-manipulation ${
                    index === currentIndex
                      ? "bg-white w-6 md:w-8"
                      : "bg-white/50 hover:bg-white/70 w-1.5 md:w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
