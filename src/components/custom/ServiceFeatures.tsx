'use client';
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const ServiceFeatures: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 个性化定制 */}
          <div className="text-center flex-1 min-w-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe0b2] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d84315]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <Link href="/customization" passHref>
              <h3 className="text-lg font-bold text-[#8d6e63] mb-2 cursor-pointer hover:text-[#d84315] transition-colors">个性化定制</h3>
            </Link>
            <p className="text-sm text-[#795548]">根据您的需求定制专属麦秆画，打造独一无二的艺术品</p>
          </div>
          
          {/* DIY材料包 */}
          <div className="text-center flex-1 min-w-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe0b2] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d84315]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Link href="/diy-kits" passHref>
              <h3 className="text-lg font-bold text-[#8d6e63] mb-2 cursor-pointer hover:text-[#d84315] transition-colors">DIY材料包</h3>
            </Link>
            <p className="text-sm text-[#795548]">提供全套材料和教学视频，让您亲手制作麦秆画作品</p>
          </div>
          
          {/* 非遗证书 */}
          <div className="text-center flex-1 min-w-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe0b2] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d84315]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <Link href="/certificates" passHref>
              <h3 className="text-lg font-bold text-[#8d6e63] mb-2 cursor-pointer hover:text-[#d84315] transition-colors">非遗证书</h3>
            </Link>
            <p className="text-sm text-[#795548]">每幅作品附非遗认证证书，确保正品与收藏价值</p>
          </div>
          
          {/* 专业包装配送 */}
          <div className="text-center flex-1 min-w-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe0b2] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d84315]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <Link href="/shipping" passHref>
              <h3 className="text-lg font-bold text-[#8d6e63] mb-2 cursor-pointer hover:text-[#d84315] transition-colors">专业包装配送</h3>
            </Link>
            <p className="text-sm text-[#795548]">专业艺术品包装，安全运输，支持全国及海外配送</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceFeatures;