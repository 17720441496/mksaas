'use client';

import React, { useState, useEffect } from 'react'
import { Footer } from '@/components/layout/footer';
import HeroSection from '@/components/custom/HeroSection';
import ProductCard from '@/components/custom/ProductCard';
import ZodiacSection from '@/components/custom/ZodiacSection';
import ArtworksSection from '@/components/custom/ArtworksSection';
import { Product, products, ProductCategory } from './products';
import { useSearchParams } from 'next/navigation';

// HeroSection图片数据
const heroImages = [
  {
    id: 1,
    imageUrl: '/maiganhua/fengjing1.jpg',
    altText: '麦秆画艺术',
    title: '精美的麦秆画艺术',
    description: '传统工艺与现代设计的完美结合',
  },
  {
    id: 2,
    imageUrl: '/maiganhua/hp1.png',
    altText: '麦秆画珍品',
    title: '手工制作的艺术珍品',
    description: '每一幅作品都凝聚了匠人的心血',
  },
  {
    id: 3,
    imageUrl: '/maiganhua/long.jpg',
    altText: '龙年麦秆画',
    title: '独特的家居装饰',
    description: '为您的家居增添一份自然与艺术的气息',
  },
];

// 分类数据
const artCategories = [
  { id: ProductCategory.ZODIAC, title: '十二生肖', description: '十二生肖主题麦秆画' },
  { id: ProductCategory.SCENERY, title: '风景系列', description: '风景主题麦秆画' },
  { id: ProductCategory.FLOWER, title: '花卉系列', description: '花卉主题麦秆画' },
  { id: ProductCategory.ANIMAL, title: '动物系列', description: '动物主题麦秆画' },
  { id: ProductCategory.CUSTOM, title: '定制系列', description: '定制主题麦秆画' },
];

export default function WheatStrawArtPage() {
  // 筛选状态
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const searchParams = useSearchParams();
  
  // 从 URL 查询参数中获取分类
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && Object.values(ProductCategory).includes(categoryParam as ProductCategory)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // 筛选产品
  useEffect(() => {
    let filtered = [...products];

    // 按关键词搜索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 按价格范围筛选
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section with Carousel */}
        <HeroSection 
          heroImages={heroImages} 
          autoPlay={true} 
          showDots={true} 
          showArrows={true} 
        />
        
        {/* 十二生肖作品展区 - 与参考图片一致的样式 */}
        <section className="py-16 px-4 bg-[#f8f4e3]">
          <ZodiacSection zodiacs={products.filter(product => product.category === ProductCategory.ZODIAC)} />
        </section>
        
        {/* 精选作品展示区 */}
        <section className="py-16 px-4">
          <ArtworksSection />
        </section>
        
        {/* 筛选和产品列表 */}
        <div className="container mx-auto px-4 py-12">
          {/* 搜索和筛选条件 */}
          <div className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">搜索和筛选产品</h2>
            
            {/* 搜索框 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">搜索产品</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="输入关键词搜索麦秆画..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 分类筛选 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">产品分类</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === 'all' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    全部
                  </button>
                  {artCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === category.id ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* 价格筛选 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">价格范围</h3>
                <div className="flex flex-col gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>¥{priceRange[0]}</span>
                    <span>¥{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 产品列表 */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">产品列表</h2>
              <span className="text-gray-600">共找到 {filteredProducts.length} 件商品</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">没有找到符合条件的产品</h3>
                <p className="text-gray-500">请尝试调整筛选条件</p>
                <button
                  className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}