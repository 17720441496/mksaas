'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import styles from './scenic-spots.module.css';

// 定义景点数据类型
export interface ScenicSpot {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  category: string;
}

// 景点数据
const scenicSpots: ScenicSpot[] = [
  {
    id: 'spot-1',
    name: '黄山日出',
    description: '黄山日出是中国最著名的自然景观之一，每年吸引着无数游客前来观赏。',
    imageUrl: '/images/scenic-spots/huangshan-sunrise.jpg',
    location: '安徽省黄山市',
    category: '山水'
  },
  {
    id: 'spot-2',
    name: '西湖美景',
    description: '西湖是中国古典园林的代表，以其秀丽的湖光山色和悠久的历史文化而闻名。',
    imageUrl: '/images/scenic-spots/west-lake.jpg',
    location: '浙江省杭州市',
    category: '湖泊'
  },
  {
    id: 'spot-3',
    name: '长城风光',
    description: '长城是中国古代的伟大防御工程，也是世界文化遗产之一。',
    imageUrl: '/images/scenic-spots/great-wall.jpg',
    location: '北京市',
    category: '历史'
  },
  {
    id: 'spot-4',
    name: '张家界奇峰',
    description: '张家界以其独特的石英砂岩峰林地貌而闻名，是《阿凡达》电影的取景地之一。',
    imageUrl: '/images/scenic-spots/zhangjiajie.jpg',
    location: '湖南省张家界市',
    category: '山水'
  },
  {
    id: 'spot-5',
    name: '丽江古城',
    description: '丽江古城是世界文化遗产，保存了完整的纳西族传统建筑和文化。',
    imageUrl: '/images/scenic-spots/lijiang-old-town.jpg',
    location: '云南省丽江市',
    category: '古城'
  },
  {
    id: 'spot-6',
    name: '九寨沟彩池',
    description: '九寨沟以其多彩的湖泊和瀑布而闻名，被誉为"人间仙境"。',
    imageUrl: '/images/scenic-spots/jiuzhaigou.jpg',
    location: '四川省阿坝藏族羌族自治州',
    category: '湖泊'
  }
];

// 背景图片数据
const backgroundImages: string[] = [
  '/images/backgrounds/bg1.jpg',
  '/images/backgrounds/bg2.jpg',
  '/images/backgrounds/bg3.jpg',
  '/images/backgrounds/bg4.jpg'
];

interface ScenicSpotsPageProps {
  params: Promise<{ locale: string }>;
}

export default function ScenicSpotsPage() {
  const router = useRouter();
  const [currentBackground, setCurrentBackground] = useState<string>(backgroundImages[0]);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  // 过滤景点列表
  const filteredSpots = activeCategory === '全部'
    ? scenicSpots
    : scenicSpots.filter(spot => spot.category === activeCategory);

  // 获取所有分类
  const categories = ['全部', ...Array.from(new Set(scenicSpots.map(spot => spot.category)))];

  // 自动切换背景图片
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const currentIndex = backgroundImages.indexOf(currentBackground);
        const nextIndex = (currentIndex + 1) % backgroundImages.length;
        setCurrentBackground(backgroundImages[nextIndex]);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentBackground]);

  // 处理卡片点击
  const handleSpotClick = (spotId: string) => {
    setSelectedSpot(spotId);
    // 跳转到详情页
    router.push(`/zh/scenic-spots/${spotId}`);
  };

  // 处理分类切换
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* 背景层 */}
      <motion.div
        className={styles.backgroundLayer}
        style={{ backgroundImage: `url(${currentBackground})` }}
        animate={{ opacity: isTransitioning ? 0.5 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* 内容容器 */}
      <div className="relative z-10">
        {/* 页面标题 */}
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            中国美景
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            探索中国最美丽的自然景观和人文胜地
          </motion.p>

          {/* 分类过滤器 */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'}
                `}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* 景点卡片网格 */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpots.map((spot) => (
              <motion.div
                key={spot.id}
                className={`${styles.card} ${selectedSpot === spot.id ? styles.selectedCard : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleSpotClick(spot.id)}
              >
                <div className={styles.cardImageContainer}>
                  <motion.img
                    src={spot.imageUrl}
                    alt={spot.name}
                    className={styles.cardImage}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{spot.name}</h3>
                  <p className={styles.cardLocation}>{spot.location}</p>
                  <p className={styles.cardDescription}>{spot.description}</p>
                  <div className={styles.cardCategory}>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                      {spot.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}