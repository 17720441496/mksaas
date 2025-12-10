'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ZodiacGrid from './ZodiacGrid';
import { Product } from '../../app/[locale]/(marketing)/wheat-straw-art/products';

interface ZodiacSectionProps {
  zodiacs: Product[];
}

export default function ZodiacSection({ zodiacs }: ZodiacSectionProps) {

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">十二生肖作品</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            每一幅生肖作品都蕴含着深厚的文化底蕴和精湛的手工技艺，采用优质麦秆制作，手工染色、剪裁、粘贴，色彩自然，立体感强，是家居装饰和送礼的理想选择。
          </p>
        </motion.div>

        {/* 生肖卡片网格 - 使用独立组件 */}
        <ZodiacGrid zodiacs={zodiacs} />

        {/* 说明文字 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>每一幅生肖麦秆画都是由资深艺术家手工制作，采用优质麦秆和环保材料，
            具有极高的艺术价值和收藏价值。</p>
        </motion.div>


      </div>
    </div>
  );
};

