'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
//精品展示
// 定义作品类型
interface Artwork {
  id: number;
  title: string;
  image: string;
  price: string;
  category: string;
  description: string;
}

// 定义组件属性
interface FeaturedArtworksProps {
  artworks: Artwork[];
  onAddToCart?: (artwork: Artwork) => void;
}

const FeaturedArtworks: React.FC<FeaturedArtworksProps> = ({ artworks, onAddToCart }) => {
  // 处理加入购物车事件
  const handleAddToCart = (e: React.MouseEvent, artwork: Artwork) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(artwork);
    }
  };

  // 定义作品卡片动画变体
  const artworkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // 定义横幅动画变体
  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">精品展示</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base px-4">
            精选麦秆画艺术作品，每一件都经过精心制作，展现了传统工艺与现代审美的完美结合。
          </p>
        </motion.div>

        {/* 特别横幅 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={bannerVariants}
          className="relative mb-12 overflow-hidden rounded-lg shadow-lg"
        >
          <div className="aspect-w-16 aspect-h-5">
            <img
              src="/maiganhua/banner-featured.png"
              alt="精选作品横幅"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">龙腾盛世</h3>
              <p className="mb-4">气势磅礴的龙主题麦秆画，展现中华民族的精神象征</p>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold">¥12,800</span>
                <motion.button
                  className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(e, artworks[0])}
                >
                  加入购物车
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={artworkVariants}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden relative">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                  />
                </motion.div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{artwork.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{artwork.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-yellow-600">{artwork.price}</span>
                  <motion.button
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(e, artwork)}
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
              {/* 悬停信息层 */}
              <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-sm mb-4 line-clamp-3">{artwork.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{artwork.price}</span>
                  <motion.button
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(e, artwork)}
                  >
                    加入购物车
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <motion.button
            className="px-6 py-2 sm:px-8 sm:py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看更多作品
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedArtworks;