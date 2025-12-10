'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  transitionDuration?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoplay = true,
  autoplayInterval = 5000,
  transitionDuration = 400,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 自动播放逻辑
  useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }

      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, autoplayInterval);
    };

    if (!isPaused) {
      startAutoplay();
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayInterval, items.length, isPaused]);

  // 手动切换到下一张
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 手动切换到上一张
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // 切换到指定索引
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // 鼠标悬停时暂停自动播放并显示导航元素
  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsHovering(true);
  };

  // 鼠标离开时恢复自动播放并隐藏导航元素
  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovering(false);
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 向左滑动
      handleNext();
    } else if (touchEnd - touchStart > 50) {
      // 向右滑动
      handlePrevious();
    }
  };

  // 键盘导航
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  }, []);

  // 添加键盘事件监听器
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
        ref={carouselRef}
        className={cn(
          'relative w-full overflow-hidden rounded-lg shadow-2xl cursor-pointer border border-amber-200/30',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="麦秆画轮播"
      >
      {/* 轮播内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration / 1000 }}
          className="relative aspect-[16/9] w-full"
        >
          {/* 图片 - 使用Next.js Image组件优化性能 */}
          <div className="relative w-full h-full">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={items[currentIndex].src}
                alt={items[currentIndex].alt}
                fill
                className="object-cover"
                quality={85}
                {...(currentIndex === 0 ? { priority: true } : { loading: "lazy" })} // 避免同时设置priority和loading="lazy"
              />
            </motion.div>
          </div>

          {/* 渐变叠加层 - 麦秆画风格 */}
          <div className="absolute inset-0 bg-gradient-to-b 
            from-amber-900/30 via-amber-800/10 to-amber-950/50" />



          {/* 内容叠加 - 传统艺术风格排版 */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            {items[currentIndex].title && (
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-amber-50 mb-3 drop-shadow-lg 
                  tracking-wide"
              >
                {items[currentIndex].title}
              </motion.h2>
            )}
            {items[currentIndex].description && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm md:text-base lg:text-lg text-amber-100/95 max-w-3xl drop-shadow-md 
                  leading-relaxed"
              >
                {items[currentIndex].description}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 导航按钮 - 传统艺术风格 */}
      <motion.button
        onClick={handlePrevious}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovering ? 1 : 0.7, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 
          bg-amber-900/50 hover:bg-amber-800/70 backdrop-blur-sm 
          text-amber-100 rounded-full p-3 transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-amber-300/50 
          border border-amber-300/30"
        aria-label="上一张"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        onClick={handleNext}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovering ? 1 : 0.7, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 
          bg-amber-900/50 hover:bg-amber-800/70 backdrop-blur-sm 
          text-amber-100 rounded-full p-3 transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-amber-300/50 
          border border-amber-300/30"
        aria-label="下一张"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* 指示器 - 优化样式和动画 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50',
              currentIndex === index
                ? 'bg-white w-6 rounded-full'
                : 'bg-white/50 hover:bg-white/70'
            )}
            aria-label={`切换到第 ${index + 1} 张`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              width: currentIndex === index ? '1.5rem' : '0.5rem',
              backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
};
