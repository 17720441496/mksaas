'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../app/[locale]/(marketing)/wheat-straw-art/products';
import { useCart } from './CartProvider';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  // 数量增减
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  // 添加到购物车
  const handleAddToCart = () => {
    // 将产品转换为购物车项格式
    const cartItem = {
      id: product.id,
      name: product.name,
      title: product.description.substring(0, 30) + '...', // 使用部分描述作为title
      price: `¥${product.price.toFixed(2)}`, // 转换为字符串格式
      image: product.image,
      description: product.description
    };
    
    // 添加到购物车
    addToCart(cartItem);
    
    // 显示添加成功提示
    alert('商品已添加到购物车');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-2 sm:px-4 py-8 sm:py-12"
    >
      {/* 产品面包屑 */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-yellow-600">首页</a>
        <span className="mx-2">/</span>
        <a href="/wheat-straw-art" className="hover:text-yellow-600">麦秆画</a>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* 产品详情 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        {/* 产品图片 */}
        <div>
          {/* 主图 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 group relative overflow-hidden">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            {/* 渐变遮罩层 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
            {/* 悬停内容层 */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 translate-y-10">
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-[#d4af37]">¥{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-300 line-through">¥{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-[#3a0c0c] hover:bg-[#5a1c1c] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                快速加入购物车
              </motion.button>
            </div>
          </div>

          {/* 缩略图 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            <div 
              className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === product.image ? 'border-yellow-600' : 'border-gray-200 hover:border-yellow-400'}`}
              onClick={() => setSelectedImage(product.image)}
            >
              <img 
                src={product.image} 
                alt={`${product.name} 缩略图`} 
                className="w-full h-24 object-cover"
              />
            </div>
          </div>
        </div>

        {/* 产品信息 */}
        <div>
          {/* 标签 */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3">促销</span>
          )}

          {/* 名称 */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">{product.name}</h1>

          {/* 评分 */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm">({product.reviews} 条评价)</span>
          </div>

          {/* 价格 */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold text-red-600">¥{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 sm:ml-3 text-base sm:text-lg text-gray-400 line-through">¥{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-red-500 text-sm">
                节省 ¥{(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* 描述 */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">产品描述</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* 规格 */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">产品规格</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="text-gray-500 text-xs sm:text-sm">尺寸</span>
                <p className="text-gray-800 font-medium">{product.size}</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="text-gray-500 text-xs sm:text-sm">材质</span>
                <p className="text-gray-800 font-medium">优质麦秆</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="text-gray-500 text-xs sm:text-sm">工艺</span>
                <p className="text-gray-800 font-medium">纯手工制作</p>
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="text-gray-500 text-xs sm:text-sm">包装</span>
                <p className="text-gray-800 font-medium">精美礼盒</p>
              </div>
            </div>
          </div>

          {/* 数量和添加到购物车 */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* 数量选择 */}
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2 text-gray-800 font-medium">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* 添加到购物车按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-1 sm:gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              添加到购物车
            </motion.button>
          </div>

          {/* 配送信息 */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">配送信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-gray-600">全国包邮</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">7天无理由退换</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 产品详情 */}
      <div className="mt-12 sm:mt-16 bg-white p-5 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">详细介绍</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            本产品采用优质麦秆，通过传统工艺手工制作而成。麦秆画是中国传统的民间艺术，具有悠久的历史和深厚的文化底蕴。
          </p>
          <p className="mb-4">
            制作过程包括选料、浸泡、熏蒸、染色、熨平、剪裁、粘贴等多道工序，每一步都需要匠人的精心操作。
          </p>
          <p className="mb-4">
            本作品图案精美，色彩自然，具有很高的艺术价值和收藏价值，是家居装饰和送礼的理想选择。
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">制作工艺</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>精选优质麦秆，确保材料的韧性和光泽</li>
            <li>传统熏蒸工艺，保持麦秆的自然色彩</li>
            <li>手工染色，色彩鲜艳持久</li>
            <li>精细剪裁，确保图案的准确性</li>
            <li>专业粘贴，保证作品的牢固性</li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">保养说明</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>避免长时间暴露在阳光下，防止褪色</li>
            <li>保持干燥，避免潮湿环境</li>
            <li>定期用软布擦拭，保持清洁</li>
            <li>避免尖锐物体划伤表面</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}