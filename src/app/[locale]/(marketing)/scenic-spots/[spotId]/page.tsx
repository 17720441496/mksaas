'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../scenic-spots.module.css';
import { ScenicSpot } from '../page';

// 景点数据 - 这里应该从API或数据库获取，为了演示直接定义
const scenicSpots: ScenicSpot[] = [
  {
    id: 'spot-1',
    name: '黄山日出',
    description: '黄山日出是中国最著名的自然景观之一，每年吸引着无数游客前来观赏。黄山位于安徽省南部，是中国十大名山之一，以奇松、怪石、云海、温泉“四绝”闻名于世。',
    imageUrl: '/images/scenic-spots/huangshan-sunrise.jpg',
    location: '安徽省黄山市',
    category: '山水'
  },
  {
    id: 'spot-2',
    name: '西湖美景',
    description: '西湖是中国古典园林的代表，以其秀丽的湖光山色和悠久的历史文化而闻名。西湖位于浙江省杭州市西部，三面环山，湖中有孤山、白堤、苏堤、杨公堤将湖面分割成若干水面。',
    imageUrl: '/images/scenic-spots/west-lake.jpg',
    location: '浙江省杭州市',
    category: '湖泊'
  },
  {
    id: 'spot-3',
    name: '长城风光',
    description: '长城是中国古代的伟大防御工程，也是世界文化遗产之一。长城东西绵延上万华里，因此又称作万里长城。现存的长城遗迹主要为建于14世纪的明长城。',
    imageUrl: '/images/scenic-spots/great-wall.jpg',
    location: '北京市',
    category: '历史'
  },
  {
    id: 'spot-4',
    name: '张家界奇峰',
    description: '张家界以其独特的石英砂岩峰林地貌而闻名，是《阿凡达》电影的取景地之一。张家界国家森林公园是中国第一个国家森林公园，被联合国教科文组织列入世界自然遗产名录。',
    imageUrl: '/images/scenic-spots/zhangjiajie.jpg',
    location: '湖南省张家界市',
    category: '山水'
  },
  {
    id: 'spot-5',
    name: '丽江古城',
    description: '丽江古城是世界文化遗产，保存了完整的纳西族传统建筑和文化。丽江古城又名大研镇，坐落在丽江坝中部，已有近千年历史。',
    imageUrl: '/images/scenic-spots/lijiang-old-town.jpg',
    location: '云南省丽江市',
    category: '古城'
  },
  {
    id: 'spot-6',
    name: '九寨沟彩池',
    description: '九寨沟以其多彩的湖泊和瀑布而闻名，被誉为"人间仙境"。九寨沟国家级自然保护区位于四川省阿坝藏族羌族自治州九寨沟县境内，是中国第一个以保护自然风景为主要目的的自然保护区。',
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

interface ScenicSpotDetailProps {
  params: Promise<{ locale: string; spotId: string }>;
}

export default function ScenicSpotDetail() {
  const router = useRouter();
  const params = useParams<{ locale: string; spotId: string }>();
  const [currentBackground, setCurrentBackground] = useState<string>(backgroundImages[0]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // 获取当前景点信息
  const spotId = params.spotId;
  const scenicSpot = scenicSpots.find(spot => spot.id === spotId);

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

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 处理返回按钮点击
  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80">
        <div className="text-white text-2xl">加载中...</div>
      </div>
    );
  }

  if (!scenicSpot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black/80 text-white">
        <h1 className="text-4xl font-bold mb-4">景点不存在</h1>
        <p className="text-xl mb-8">您访问的景点不存在或已被移除</p>
        <button
          className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 hover:scale-105 transition-all duration-300"
          onClick={handleBackClick}
        >
          返回列表
        </button>
      </div>
    );
  }

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
        {/* 返回按钮 */}
        <div className="container mx-auto px-4 py-8">
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300"
            onClick={handleBackClick}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            ← 返回列表
          </motion.button>
        </div>

        {/* 景点详情 */}
        <div className="container mx-auto px-4 pb-20">
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* 景点图片 */}
            <div className="h-96 overflow-hidden">
              <motion.img
                src={scenicSpot.imageUrl}
                alt={scenicSpot.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            {/* 景点信息 */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {scenicSpot.name}
                </h1>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">📍</span>
                    <span className="text-xl">{scenicSpot.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">🏷️</span>
                    <span className="text-xl">{scenicSpot.category}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">景点介绍</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {scenicSpot.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  这里可以添加更多关于{scenicSpot.name}的详细信息，包括历史背景、最佳游览时间、门票信息等。
                  游客可以在这里了解到如何前往该景点，以及周边的住宿和餐饮推荐。
                </p>
              </motion.div>

              {/* 相关推荐 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">相关推荐</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {scenicSpots
                    .filter(spot => spot.id !== scenicSpot.id)
                    .slice(0, 3)
                    .map((spot) => (
                      <div
                        key={spot.id}
                        className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => router.push(`/zh/scenic-spots/${spot.id}`)}
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={spot.imageUrl}
                            alt={spot.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {spot.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {spot.location}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {spot.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}