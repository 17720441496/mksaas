'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from './CartProvider';
import { Product } from '../../app/[locale]/(marketing)/wheat-straw-art/products';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  // 产品卡片动画变体
  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -10, transition: { duration: 0.2 } }
  };

  // 处理卡片点击，跳转到产品详情页
  const handleCardClick = () => {
    router.push(`/wheat-straw-art/${product.id}`);
  };

  // 添加到购物车
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发卡片点击
    
    // 将产品转换为购物车项格式
    const cartItem = {
      id: product.id,
      name: product.name,
      title: product.description.substring(0, 30) + '...', // 使用部分描述作为title
      price: `¥${product.price.toFixed(2)}`, // 转换为字符串格式
      image: product.image,
      description: product.description
    };
    
    addToCart(cartItem);
  };

  return (
    <motion.div
      variants={productCardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl sm:mx-auto sm:max-w-xs"
      onClick={handleCardClick}
    >
      {/* 产品图片 */}
      <div className="relative aspect-square sm:aspect-auto sm:h-64 overflow-hidden bg-gray-100 group">
        <motion.div
          className="relative w-full h-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
          {/* 渐变遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
          {/* 悬停内容层 */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-[#d4af37]">¥{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-300 line-through">¥{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-xs text-gray-200 mb-3 line-clamp-2">{product.description.substring(0, 50)}...</p>
            <button
              className="w-full bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white py-2 rounded-lg transition-colors duration-300 text-sm"
              onClick={handleAddToCart}
            >
              快速加入购物车
            </button>
          </div>
        </motion.div>
      </div>

      {/* 产品信息 */}
      <div className="p-3 sm:p-5">
        {/* 产品标签 */}
        <div className="flex flex-wrap gap-2 mb-1 sm:mb-2">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* 产品名称 */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>

        {/* 产品价格 */}
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-lg sm:text-xl font-bold text-yellow-600">¥{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">¥{product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* 产品评分和评价 */}
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 sm:w-4 h-3 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span>({product.reviews})</span>
        </div>
      </div>

      {/* 加入购物车按钮 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 border-t">
        <button
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-300 font-medium text-sm"
          onClick={handleAddToCart}
        >
          加入购物车
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
