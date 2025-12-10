'use client';
import { useRef } from 'react';

interface ArtCategory {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  color: string;
}

interface ArtCategorySliderProps {
  categories: ArtCategory[];
}

export default function ArtCategorySlider({ categories }: ArtCategorySliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-10 sm:py-16 px-2 sm:px-4 overflow-hidden" style={{ 
      backgroundImage: 'url(/maiganhua/bj.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className="inline-block px-8 sm:px-12 py-2 sm:py-3 bg-[#f5f5f5] rounded-sm shadow-lg"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id="chinese-pattern" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M0 10h10M10 0v10" stroke="%23d4af37" stroke-width="0.5" opacity="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="%23f5f5f5"/%3E%3Crect width="100%25" height="100%25" fill="url(%23chinese-pattern)"/%3E%3C/svg%3E")',
              fontFamily: 'SimSun, serif'
            }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#3a0c0c]">典·藏</h2>
          </div>
        </div>

        {/* 静态展示容器 */}
        <div className="relative pt-16 pb-24">

          {/* 水平排列卡片 */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide px-4 sm:px-8"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {/* 仅显示原始分类数据，不再复制 */}
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-40 sm:w-52 relative z-1"
              >
                {/* 卡片 */}
                  <div 
                    className="relative h-[400px] sm:h-[550px] flex flex-col"
                    style={{ 
                      backgroundColor: category.color,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                  {/* 标题区域 */}
                  <div className="p-3 sm:p-4 text-center bg-white text-black font-bold text-sm sm:text-base shadow-md">
                    {category.title}
                  </div>

                  {/* 图片容器 */}
                  <div className="flex-1 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}