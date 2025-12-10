'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

// 定义英雄区图片类型
interface HeroImage {
  id: number;
  imageUrl: string;
  altText: string;
  title?: string;
  description?: string;
}

// 定义组件属性
interface HeroSectionProps {
  heroImages: HeroImage[];
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImages, autoPlay = true, showDots = true, showArrows = true }) => {
  // 轮播状态管理
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [enlargedImagePosition, setEnlargedImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { addToCart } = useCart(); // 添加购物车钩子
  
  // 典藏区轮播状态
  const [scrollX, setScrollX] = useState<number>(0);
  const collectionImages = [
    { src: '/maiganhua/diancang3.jpg', alt: '典藏作品1' },
    { src: '/maiganhua/diancang4.jpg', alt: '典藏作品2' },
    { src: '/maiganhua/diancang5.jpg', alt: '典藏作品3' },
    { src: '/maiganhua/diancang6.jpg', alt: '典藏作品4' },
    { src: '/maiganhua/diancang7.jpg', alt: '典藏作品5' },
    { src: '/maiganhua/diancang8.jpg', alt: '典藏作品6' },
    { src: '/maiganhua/diancang9.jpg', alt: '典藏作品7' },
    { src: '/maiganhua/diancang10.jpg', alt: '典藏作品8' },
    { src: '/maiganhua/diancang11.jpg', alt: '典藏作品9' },
    { src: '/maiganhua/shuping3.jpg', alt: '典藏作品10' },
    { src: '/maiganhua/shuping4.jpg', alt: '典藏作品11' },
    { src: '/maiganhua/shuping5.jpg', alt: '典藏作品12' },
    { src: '/maiganhua/shouye1.jpg', alt: '典藏作品13' },
    { src: '/maiganhua/shouye2.jpg', alt: '典藏作品14' }
  ];
  // 复制图片数组以实现无缝滚动
  const extendedCollectionImages = [...collectionImages, ...collectionImages];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const collectionIntervalRef = useRef<number | null>(null);
  const autoPlayInterval = 5000;
  const scrollSpeed = 0.4; // 滚动速度（像素/帧）- 减慢轮播速度

  // 自动轮播功能
  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 典藏区自动轮播功能 - 传送带效果
  const startCollectionAutoPlay = () => {
    if (collectionIntervalRef.current) {
      clearInterval(collectionIntervalRef.current);
    }
    
    let lastTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      setScrollX(prevScrollX => {
        // 计算新的滚动位置
        let newScrollX = prevScrollX + (scrollSpeed * deltaTime) / 16; // 基于60fps的滚动速度
        
        // 当滚动到原始数组末尾时，重置到起始位置以实现无缝滚动
        const singleImageWidth = 300; // 假设每张图片宽度为300px
        const totalScrollWidth = singleImageWidth * collectionImages.length;
        
        if (newScrollX >= totalScrollWidth) {
          newScrollX = 0;
        }
        
        return newScrollX;
      });
      
      collectionIntervalRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const stopCollectionAutoPlay = () => {
    if (collectionIntervalRef.current) {
      cancelAnimationFrame(collectionIntervalRef.current);
      collectionIntervalRef.current = null;
    }
  };

  // 自动轮播的副作用
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
      startCollectionAutoPlay();
    }
    return () => {
      stopAutoPlay();
      stopCollectionAutoPlay();
    };
  }, [heroImages.length, autoPlay]);

  // 切换幻灯片
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 下一张幻灯片
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  // 上一张幻灯片
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // 图片点击放大功能
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setEnlargedImagePosition({
      x: rect.left,
      y: rect.top,
    });
    setEnlargedImage({
      src: e.currentTarget.src,
      alt: e.currentTarget.alt,
    });
    setIsEnlarged(true);
    stopAutoPlay();
    stopCollectionAutoPlay();
  };

  // 关闭放大图片
  const handleCloseEnlargedImage = () => {
    setIsEnlarged(false);
    setTimeout(() => {
      setEnlargedImage(null);
    }, 300);
    startAutoPlay();
    startCollectionAutoPlay();
  };
  
  // 典藏区轮播控制 - 暂停/恢复
  const handleCollectionMouseEnter = () => {
    stopCollectionAutoPlay();
  };
  
  const handleCollectionMouseLeave = () => {
    startCollectionAutoPlay();
  };

  return (
    <div>
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      {/* 英雄区轮播 */}
        <AnimatePresence>
          {/* 旧图片作为背景保持可见 */}
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: index === currentSlide ? 1 : 0 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0.5,
                zIndex: index === currentSlide ? 10 : 5
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                opacity: { duration: 2.5 }
              }}
            >
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={handleImageClick}
                style={{ 
                  backgroundImage: `url(${image.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* 半透明遮罩 */}
                <div className="absolute inset-0 bg-gray-500 opacity-20"></div>
                {/* 为了保持悬停缩放效果，添加一个绝对定位的伪元素 */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      {/* 左侧文字标题区域 */}
      <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 z-60 w-full md:w-1/3 px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-left"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 text-yellow-300 font-[STKaiti,正楷] drop-shadow-lg">
            <div className="block tracking-wider">指尖麦韵</div>
            <div className="block tracking-wider">非遗之美</div>
          </h1>
          <p className="text-lg sm:text-xl mb-6 md:mb-12 drop-shadow-md ml-2 sm:ml-4">巧夺天工 · 传承千年</p>
          <motion.button
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-lg sm:text-xl drop-shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            欣赏佳作
          </motion.button>
        </motion.div>
      </div>

      {/* 轮播控制按钮 */}
      {showArrows && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-100 text-black p-2 rounded-full z-10"
            onClick={goToPrevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-100 text-black p-2 rounded-full z-10"
            onClick={goToNextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 轮播指示器 */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-30'}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* 放大图片模态框 */}
      <AnimatePresence>
        {isEnlarged && enlargedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEnlargedImage}
          >
            <motion.img
              src={enlargedImage.src}
              alt={enlargedImage.alt}
              className="max-w-full max-h-full object-contain"
              initial={{ x: enlargedImagePosition.x, y: enlargedImagePosition.y, width: '50%', height: 'auto' }}
              animate={{ x: 0, y: 0, width: '80%', height: 'auto' }}
              exit={{ x: enlargedImagePosition.x, y: enlargedImagePosition.y, width: '50%', height: 'auto' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* 典藏区 */}
    <div className="relative bg-amber-50 py-16 px-4 overflow-hidden">
      {/* 金色点缀背景 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.6)_0%,rgba(251,191,36,0)_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>
      
      {/* 典藏标题 */}
      <div className="container mx-auto relative z-10 mb-16">
        <div className="flex justify-center">
          <button className="bg-white text-amber-900 px-8 py-2 rounded-sm border-2 border-amber-800 hover:bg-amber-100 transition-colors">
            <span className="text-xl font-bold">典 · 藏</span>
          </button>
        </div>
      </div>
      
      {/* 典藏作品轮播展示 - 传送带效果 */}
      <div className="container mx-auto relative z-10">
        {/* 轮播容器 */}
        <div 
          className="overflow-hidden" 
          onMouseEnter={handleCollectionMouseEnter}
          onMouseLeave={handleCollectionMouseLeave}
        >
          <motion.div
            className="flex gap-4 md:gap-8 pb-8"
            style={{ x: -scrollX }}
            transition={{ duration: 0 }}
          >
            {extendedCollectionImages.map((image, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2 min-w-[300px] md:min-w-[400px] border-8 border-image-slice-3 border-image-width-3 border-image-outset-0 border-image-repeat-round"
                style={{ borderImageSource: 'url(/maiganhua/biankuang.png)' }}
              >
                <div className="bg-amber-300 text-brown-800 py-2 px-3 shadow-md shadow-amber-500/30">
                  <h3 className="text-center font-bold text-sm text-amber-900">{image.alt}</h3>
                </div>
                <div className="relative aspect-[9/16]">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

    {/* 分类区 */}
    <div className="bg-amber-50 py-16 px-4">
      <div className="container mx-auto">
        {/* 分类标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">麦秆画分类</h2>
          <p className="text-amber-800">精美不同风格与题材的麦秆画作品，满足您的不同装饰需求</p>
        </div>

        {/* 分类卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 花鸟系列 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            {/* 标签 */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">人气爆款</span>
            </div>
            {/* 图片 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/maiganhua/huaniao.jpg" 
                  alt="花鸟系列" 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
            {/* 内容 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">花鸟系列</h3>
              <p className="text-gray-600 mb-4">精雕细琢自然之美</p>
              <div className="text-gray-500 text-sm">
                共32件作品
              </div>
            </div>
          </div>

          {/* 山水系列 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            {/* 标签 */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">新品上市</span>
            </div>
            {/* 图片 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/maiganhua/fenlei/shanshui.jpg" 
                  alt="山水系列" 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
            {/* 内容 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">山水系列</h3>
              <p className="text-gray-600 mb-4">意境悠远的东方美学</p>
              <div className="text-gray-500 text-sm">
                共28件作品
              </div>
            </div>
          </div>

          {/* 人物系列 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            {/* 标签 */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">典雅收藏</span>
            </div>
            {/* 图片 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/maiganhua/shuping3.jpg" 
                  alt="人物系列" 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
            {/* 内容 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">人物系列</h3>
              <p className="text-gray-600 mb-4">形神兼备的人文艺术</p>
              <div className="text-gray-500 text-sm">
                共18件作品
              </div>
            </div>
          </div>

          {/* 民俗系列 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            {/* 标签 */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">民俗经典</span>
            </div>
            {/* 图片 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/maiganhua/minjianxisu.jpg" 
                  alt="民俗系列" 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
            {/* 内容 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">民俗系列</h3>
              <p className="text-gray-600 mb-4">浓郁醇厚的乡土风情</p>
              <div className="text-gray-500 text-sm">
                共24件作品
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 精选作品模块 */}
    <div className="bg-amber-50 py-16 px-4">
      <div className="container mx-auto">
        {/* 精选作品标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">精选作品</h2>
        </div>

        {/* 横幅图片 */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img 
              src="/maiganhua/jingxuan/henglong.jpg" 
              alt="精选作品横幅" 
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
              <h3 className="text-3xl font-bold mb-2">龙腾盛世</h3>
              <p className="text-xl font-semibold text-[#d4af37] mb-4">¥8,888</p>
              <p className="text-lg text-gray-200 mb-6 line-clamp-2">中国传统麦秆画艺术精品，展现龙的威严与力量</p>
            </div>
            <button
              className="absolute bottom-8 left-4 bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-1.5 px-4 rounded-full transition-all duration-300 text-xs shadow-md hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              onClick={() => {
                const cartItem = {
                  id: 'longtengshengshi',
                  name: '龙腾盛世',
                  title: '中国传统麦秆画艺术精品，展现龙的威严与力量',
                  price: '¥8,888',
                  image: '/maiganhua/jingxuan/henglong.jpg',
                  description: '中国传统麦秆画艺术精品，展现龙的威严与力量'
                };
                addToCart(cartItem);
                alert('商品已添加到购物车');
              }}
            >
              快速加入购物车
            </button>
          </div>
        </div>

        {/* 中间内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 左侧区域 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-square relative group">
                <img 
                  src="/maiganhua/jingxuan/18.jpg" 
                  alt="精选作品1" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-3">花开富贵</h3>
                  <p className="text-xl font-semibold text-[#d4af37] mb-8">¥3,280</p>
                </div>
                <button
                  className="absolute bottom-8 left-4 bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-1.5 px-4 rounded-full transition-all duration-300 text-xs shadow-md hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  onClick={() => {
                    const cartItem = {
                      id: 'huakaifugui',
                      name: '花开富贵',
                      title: '中国传统麦秆画，花开富贵图案',
                      price: '¥3,280',
                      image: '/maiganhua/jingxuan/18.jpg',
                      description: '中国传统麦秆画，花开富贵图案'  
                    };
                    addToCart(cartItem);
                    alert('商品已添加到购物车');
                  }}
                >
                  快速加入购物车
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-square relative group">
                <img 
                  src="/maiganhua/jingxuan/huaniao.jpg" 
                  alt="花鸟作品" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-3">鸟语花香</h3>
                  <p className="text-xl font-semibold text-[#d4af37] mb-8">¥2,580</p>
                </div>
                <button
                  className="absolute bottom-8 left-4 bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-1.5 px-4 rounded-full transition-all duration-300 text-xs shadow-md hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  onClick={() => {
                    const cartItem = {
                      id: 'niaoyuhuaxiang',
                      name: '鸟语花香',
                      title: '中国传统麦秆画，鸟语花香图案',
                      price: '¥2,580',
                      image: '/maiganhua/jingxuan/huaniao.jpg',
                      description: '中国传统麦秆画，鸟语花香图案'
                    };
                    addToCart(cartItem);
                    alert('商品已添加到购物车');
                  }}
                >
                  快速加入购物车
                </button>
              </div>
            </div>
            
            {/* 下方16:9清明上河图 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-video relative group">
              {/* 动画背景层 */}
              <div 
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(/maiganhua/jingxuan/qingming.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  width: '200%', // 宽度设置为200%以实现滚动效果
                  animationName: 'slideLeft',
                  animationDuration: '30s', // 将动画时长从20秒改为30秒，降低播放速度
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite'
                }}
              ></div>
              {/* 渐变遮罩，让动画过渡更自然 */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1) 100%)'
              }}></div>
              {/* 鼠标悬停渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
              {/* 鼠标悬停内容 */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                <h3 className="text-2xl font-bold mb-3">清明上河图长卷</h3>
                <p className="text-xl font-semibold text-[#d4af37] mb-4">¥12,800</p>
                <p className="text-lg text-gray-200 mb-8 line-clamp-2">经典名画清明上河图的麦秆画版本，工艺精湛</p>
              </div>
              <button
                className="absolute bottom-8 left-4 bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-1.5 px-4 rounded-full transition-all duration-300 text-xs shadow-md hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                onClick={() => {
                  const cartItem = {
                    id: 'qingmingshanghetu',
                    name: '清明上河图长卷',
                    title: '经典名画清明上河图的麦秆画版本',
                    price: '¥12,800',
                    image: '/maiganhua/jingxuan/qingming.jpg',
                    description: '经典名画清明上河图的麦秆画版本，工艺精湛'
                  };
                  addToCart(cartItem);
                  alert('商品已添加到购物车');
                }}
              >
                快速加入购物车
              </button>
              {/* 直接在div中定义动画 */}
              <style>{`
                @keyframes slideLeft {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
              `}</style>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="flex flex-col">
            <div className="p-8 flex-grow">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">麦秆画艺术的独特魅力</h3>
                <p className="text-gray-700 mb-4">麦秆画起源于中国传统民间艺术时期，至今已有千年历史。它以小麦秸秆为原料，通过选料、熏蒸、剪刮、粘贴等二十多道工序精心制作而成，具有其独特的肌理与质感的立体效果，色彩自然柔和。画面古朴典雅，山水人物等多种题材，是中华文化的重要组成部分。</p>
                <h4 className="text-xl font-bold text-amber-800 mb-2">艺术成就特点</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>麦秆画是中国民间艺术的杰出代表</li>
                  <li>采用纯天然麦秆材料，通过二十多道工序展现独特的自然纹理</li>
                  <li>融合了绘画、雕刻、剪贴等多种艺术形式，具有独特的立体效果</li>
                </ul>
              </div>
            </div>
            
            {/* 红色作品图片 */}
            <div className="overflow-hidden mt-auto group relative">
              <img 
                src="/maiganhua/jingxuan/hong.png" 
                alt="红色作品" 
                className="w-full h-[calc(9/16*100% - 33px)] object-cover transform -translate-y-5 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                <h3 className="text-2xl font-bold mb-2">唐代宫廷花鸟</h3>
                <p className="text-xl font-semibold text-[#d4af37] mb-4">¥4,580</p>
                <p className="text-lg text-gray-200 mb-6 line-clamp-2">展现唐代宫廷花鸟艺术的精美麦秆画</p>
              </div>
              <button
                className="absolute bottom-8 left-4 bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-1.5 px-4 rounded-full transition-all duration-300 text-xs shadow-md hover:shadow-lg hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                onClick={() => {
                  const cartItem = {
                    id: 'tangdaigongtinghuaniao',
                    name: '唐代宫廷花鸟',
                    title: '展现唐代宫廷花鸟艺术的精美麦秆画',
                    price: '¥4,580',
                    image: '/maiganhua/jingxuan/hong.png',
                    description: '展现唐代宫廷花鸟艺术的精美麦秆画'
                  };
                  addToCart(cartItem);
                  alert('商品已添加到购物车');
                }}
              >
                快速加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default HeroSection;