"use client";
import React, { useState, useEffect, useRef } from "react";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  interval?: number; // 自动切换间隔时间（毫秒），默认3秒
  height?: string; // 轮播高度，默认500px
  autoplay?: boolean; // 是否自动播放，默认true
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 3000,
  height = "500px",
  autoplay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // 从第一个实际图片开始
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  // 自动播放逻辑
  useEffect(() => {
    if (!autoplay) return;

    const startTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    };

    if (!isPaused) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, interval, isPaused]);

  // 监听当前索引变化，实现无缝循环
  useEffect(() => {
    if (isTransitioningRef.current) return;
    
    // 当到达最后一个副本图片时，瞬间切换到第一张实际图片
    if (currentIndex === images.length + 1) {
      isTransitioningRef.current = true;
      setTimeout(() => {
        setCurrentIndex(1);
        isTransitioningRef.current = false;
      }, 500); // 与transition duration一致
    }
    
    // 当到达第一个副本图片时，瞬间切换到最后一张实际图片
    else if (currentIndex === 0) {
      isTransitioningRef.current = true;
      setTimeout(() => {
        setCurrentIndex(images.length);
        isTransitioningRef.current = false;
      }, 500); // 与transition duration一致
    }
  }, [currentIndex, images.length]);

  // 切换到下一张
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // 切换到上一张
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // 直接跳转到指定图片（实际图片，非副本）
  const goToSlide = (index: number) => {
    setCurrentIndex(index + 1); // +1是因为我们在前面添加了一个副本
  };

  // 鼠标悬停暂停/恢复
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">暂无图片</div>;
  }

  // 为实现无缝循环，在开头和结尾添加副本图片
  const extendedImages = [
    images[images.length - 1], // 最后一张的副本，放在开头
    ...images, // 实际图片
    images[0] // 第一张的副本，放在结尾
  ];

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden"
      style={{ height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 图片容器 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          // 确保过渡动画只在非瞬间切换时应用
          transition: isTransitioningRef.current ? 'none' : 'transform 500ms ease-in-out'
        }}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 前进/后退按钮 */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all duration-300"
        onClick={prevSlide}
        aria-label="上一张"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all duration-300"
        onClick={nextSlide}
        aria-label="下一张"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${(index + 1) === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            onClick={() => goToSlide(index)}
            aria-label={`跳转到第 ${index + 1} 张图片`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;