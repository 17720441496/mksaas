'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import ProductDetail from '@/components/custom/ProductDetail';
import { Product, getProductById } from '../products';
import { notFound } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 从URL参数获取产品ID
    const productId = params.id as string;
    
    // 获取产品数据
    const foundProduct = getProductById(productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // 产品不存在，显示404
      notFound();
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">产品不存在</h2>
          <p className="text-gray-600 mb-4">您访问的产品可能已被删除或不存在</p>
          <a 
            href="/wheat-straw-art" 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            返回产品列表
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  );
}