'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { Product } from '../../app/[locale]/(marketing)/wheat-straw-art/products';

// 定义组件属性
interface ZodiacGridProps {
  zodiacs: Product[];
}

const ZodiacGrid: React.FC<ZodiacGridProps> = ({ zodiacs }) => {
  const { addToCart } = useCart();
  
  // 处理加入购物车事件
  const handleAddToCart = (e: React.MouseEvent, zodiac: Product) => {
    e.stopPropagation();
    
    // 将产品转换为购物车项格式
    const cartItem = {
      id: zodiac.id,
      name: zodiac.name,
      title: zodiac.description.substring(0, 30) + '...',
      price: `¥${zodiac.price.toFixed(2)}`,
      image: zodiac.image,
      description: zodiac.description
    };
    
    // 添加到购物车
    addToCart(cartItem);
    
    // 显示添加成功提示
    alert(`${zodiac.name} 已添加到购物车！`);
  };

  // 定义生肖卡片动画变体
  const zodiacCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
    hover: {
      scale: 1.05,
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {(zodiacs || []).map((zodiac, index) => (
        <motion.div
            key={zodiac.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={zodiacCardVariants}
            whileHover="hover"
            className="group border-4 border-amber-500 shadow-2xl bg-white p-4 flex flex-col h-full"
          >
            {/* 合并白色内衬、图片容器和产品信息 */}
            <div className="border border-gray-300 bg-gray-50 p-2 flex flex-col h-full">
              {/* 图片容器 - 模拟深色背景的麦秆画效果 */}
              <div className="aspect-[3/4] overflow-hidden bg-gray-200 relative group">
                <motion.img
                  src={zodiac.image}
                  alt={zodiac.name}
                  className="w-full h-full object-cover"
                />
                {/* 渐变遮罩层 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-30"></div>
              </div>
              {/* 产品信息 - 与参考图片一致的文字样式 */}
              <div className="mt-3 text-center flex flex-col flex-grow">
                <h3 className="text-base font-bold text-red-700 mb-1">{zodiac.name}</h3>
                <p className="text-xs text-gray-600 mb-1 line-clamp-2 h-10 overflow-hidden">{zodiac.description}</p>
                <div className="text-base font-bold text-gray-800 my-2">¥{zodiac.price.toLocaleString()}</div>
                {zodiac.yearRange && (
                  <div className="text-xs text-gray-500 mb-3">{zodiac.yearRange}</div>
                )}
                {/* 加入购物车按钮 */}
                <button
                  onClick={(e) => handleAddToCart(e, zodiac)}
                  className="mt-auto bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors duration-300"
                >
                  加入购物车
                </button>
              </div>
            </div>
          </motion.div>
      ))}
    </div>
  );
};

export default ZodiacGrid;