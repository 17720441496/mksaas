import React from 'react';
import { motion } from 'framer-motion';

// 定义分类卡片类型
interface CategoryCard {
  id: number;
  title: string;
  image: string;
  description: string;
  color: string;
}

// 定义组件属性
interface CategorySectionProps {
  categories: CategoryCard[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  // 定义卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      {/* 标题区域 */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">麦秆画分类</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            麦秆画以其独特的艺术形式和丰富的表现力，展现了中国传统文化的精髓。
            我们的作品涵盖了花鸟、山水、人物等多个系列，每一件都凝聚了艺术家的心血和智慧。
          </p>
        </motion.div>

        {/* 分类卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="relative overflow-hidden rounded-lg shadow-lg group"
              style={{ backgroundColor: category.color }}
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;