'use client';

import React from 'react';
import { useCart } from './CartProvider';
import { motion } from 'framer-motion';

interface Artwork {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const artworks: Artwork[] = [
  {
    id: 'dragon-painting',
    name: '龙腾盛世',
    title: '麦秆画精品 - 龙腾盛世',
    price: '¥8,888',
    image: '/maiganhua/henglong.jpg',
    description: '中国传统麦秆画艺术精品，展现龙的威严与力量'
  },
  {
    id: 'tang-dynasty-flying',
    name: '唐代飞天壁画',
    title: '麦秆画精品 - 唐代飞天壁画',
    price: '¥5,680',
    image: '/maiganhua/shouye2.jpg',
    description: '再现唐代飞天壁画的优美姿态，展现古代艺术魅力'
  },
  {
    id: 'blossoming-wealth',
    name: '花开富贵',
    title: '麦秆画精品 - 花开富贵',
    price: '¥3,280',
    image: '/maiganhua/18.jpg',
    description: '寓意吉祥的花开富贵图案，适合家居装饰'
  },
  {
    id: 'qingming-river',
    name: '清明上河图长卷',
    title: '麦秆画精品 - 清明上河图长卷',
    price: '¥12,800',
    image: '/maiganhua/qingming.jpg',
    description: '经典名画清明上河图的麦秆画版本，工艺精湛'
  },
  {
    id: 'tang-dynasty-flowers',
    name: '唐代宫廷花鸟',
    title: '麦秆画精品 - 唐代宫廷花鸟',
    price: '¥4,580',
    image: '/maiganhua/hong.png',
    description: '展现唐代宫廷花鸟艺术的精美麦秆画'
  }
];

export default function ArtworksSection() {
  const { addToCart } = useCart();

  const handleAddToCart = (artwork: Artwork) => {
    addToCart(artwork);
    // 可以添加一些反馈，比如显示添加成功的提示
    alert(`${artwork.name} 已添加到购物车！`);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 主展示图 */}
        <div className="mb-10" style={{ opacity: 1, transform: 'none' }}>
          <div className="relative overflow-hidden rounded-lg group h-64 md:h-96 bg-gray-200">
            <img 
              src={artworks[0].image} 
              alt={artworks[0].name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
              <h3 className="text-xl font-bold mb-2">{artworks[0].name}</h3>
              <p className="text-2xl font-semibold text-[#d4af37]">{artworks[0].price}</p>
              <p className="text-sm text-gray-200 mb-4 max-w-md">{artworks[0].description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(artworks[0])}
                className="mt-2 px-6 py-2 bg-[#3a0c0c] text-white rounded-md hover:bg-[#5a1c1c] transition-colors duration-300"
              >
                加入购物车
              </motion.button>
            </div>
          </div>
        </div>

        {/* 艺术品展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {/* 左侧艺术品网格 */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6" style={{ opacity: 1, transform: 'none' }}>
            {/* 唐代飞天壁画 */}
            <div className="relative" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative overflow-hidden aspect-square group rounded-lg shadow-lg">
                <img 
                  src={artworks[1].image} 
                  alt={artworks[1].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
                  <h3 className="text-lg font-bold mb-1">{artworks[1].name}</h3>
                  <p className="text-xl font-semibold text-[#d4af37]">{artworks[1].price}</p>
                  <p className="text-xs text-gray-200 mb-2 truncate">{artworks[1].description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(artworks[1])}
                    className="mt-1 px-4 py-1.5 bg-[#3a0c0c] text-white rounded-md hover:bg-[#5a1c1c] transition-colors duration-300 text-sm"
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 花开富贵 */}
            <div className="relative" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative overflow-hidden aspect-square group rounded-lg shadow-lg">
                <img 
                  src={artworks[2].image} 
                  alt={artworks[2].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
                  <h3 className="text-lg font-bold mb-1">{artworks[2].name}</h3>
                  <p className="text-xl font-semibold text-[#d4af37]">{artworks[2].price}</p>
                  <p className="text-xs text-gray-200 mb-2 truncate">{artworks[2].description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(artworks[2])}
                    className="mt-1 px-4 py-1.5 bg-[#3a0c0c] text-white rounded-md hover:bg-[#5a1c1c] transition-colors duration-300 text-sm"
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 清明上河图长卷 */}
            <div className="relative col-span-2" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative overflow-hidden aspect-video group rounded-lg shadow-lg">
                <div 
                  className="w-full h-full" 
                  aria-label={artworks[3].name} 
                  style={{ 
                    backgroundImage: `url("${artworks[3].image}")`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: '38.115% center'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
                  <h3 className="text-xl font-bold mb-2">{artworks[3].name}</h3>
                  <p className="text-2xl font-semibold text-[#d4af37]">{artworks[3].price}</p>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">{artworks[3].description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(artworks[3])}
                    className="mt-2 px-6 py-2 bg-[#3a0c0c] text-white rounded-md hover:bg-[#5a1c1c] transition-colors duration-300"
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
              <img 
                src={artworks[3].image} 
                alt={artworks[3].name} 
                className="sr-only"
              />
            </div>
          </div>

          {/* 右侧信息和艺术品 */}
          <div className="md:col-span-1 text-center" style={{ opacity: 1, transform: 'none' }}>
            <h2 className="text-xl font-bold text-[#3a0c0c] mb-4">麦秆画艺术的独特魅力</h2>
            <p className="text-[#3a0c0c]/80 text-sm mb-6">
              麦秆画是中国传统民间艺术的瑰宝，起源于隋唐时期，至今已有千年历史。它以小麦秸秆为原料，通过选材、煮染、刮削、粘贴等二十多道工序精心制作而成。
              麦秆画兼具绘画的细腻与雕塑的立体感，色彩自然柔和，题材广泛，涵盖花鸟虫鱼、山水人物等多种主题，是中华文化的重要组成部分。
            </p>

            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-[#3a0c0c] mb-3 text-center">艺术成就特点</h3>
              <ul className="space-y-2">
                <li className="text-[#3a0c0c]/80 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 mr-2 flex-shrink-0"></span>
                  <span>麦秆画是中国非物质文化遗产，是传统民间工艺的杰出代表</span>
                </li>
                <li className="text-[#3a0c0c]/80 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 mr-2 flex-shrink-0"></span>
                  <span>采用纯天然麦秆材料，通过二十多道工序展现独特的自然纹理与光泽</span>
                </li>
                <li className="text-[#3a0c0c]/80 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 mr-2 flex-shrink-0"></span>
                  <span>融合了绘画、雕塑、剪纸等多种艺术形式，具有独特的立体视觉效果</span>
                </li>
              </ul>
            </div>

            {/* 唐代宫廷花鸟 */}
            <div className="mt-12 relative" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative overflow-hidden aspect-[3/4] group rounded-lg shadow-lg">
                <img 
                  src={artworks[4].image} 
                  alt={artworks[4].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
                  <h3 className="text-lg font-bold mb-1">{artworks[4].name}</h3>
                  <p className="text-xl font-semibold text-[#d4af37]">{artworks[4].price}</p>
                  <p className="text-xs text-gray-200 mb-2 line-clamp-2">{artworks[4].description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(artworks[4])}
                    className="mt-1 px-4 py-1.5 bg-[#3a0c0c] text-white rounded-md hover:bg-[#5a1c1c] transition-colors duration-300 text-sm"
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
