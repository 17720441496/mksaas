'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 十二时辰数据
const twelveHours = [
  { hour: '子', time: '23:00-01:00' },
  { hour: '丑', time: '01:00-03:00' },
  { hour: '寅', time: '03:00-05:00' },
  { hour: '卯', time: '05:00-07:00' },
  { hour: '辰', time: '07:00-09:00' },
  { hour: '巳', time: '09:00-11:00' },
  { hour: '午', time: '11:00-13:00' },
  { hour: '未', time: '13:00-15:00' },
  { hour: '申', time: '15:00-17:00' },
  { hour: '酉', time: '17:00-19:00' },
  { hour: '戌', time: '19:00-21:00' },
  { hour: '亥', time: '21:00-23:00' },
];

// 十二生肖图片数据
const zodiacImages = [
  { 
    name: '鼠', 
    imageUrl: '/maiganhua/shu.jpg',
    description: '鼠年出生的人机智聪明，适应力强，善于利用机会。在十二生肖中排名第一。'
  },
  { 
    name: '牛', 
    imageUrl: '/maiganhua/niu.jpg',
    description: '牛年出生的人勤奋踏实，坚韧不拔，具有强烈的责任感和奉献精神。'
  },
  { 
    name: '虎', 
    imageUrl: '/maiganhua/hu.jpg',
    description: '虎年出生的人勇敢自信，具有领导才能和冒险精神，充满活力。'
  },
  { 
    name: '兔', 
    imageUrl: '/maiganhua/tu.jpg',
    description: '兔年出生的人温柔善良，聪明伶俐，具有较强的直觉和艺术天赋。'
  },
  { 
    name: '龙', 
    imageUrl: '/maiganhua/long.jpg',
    description: '龙年出生的人威严高贵，具有创造力和进取心，是天生的领导者。'
  },
  { 
    name: '蛇', 
    imageUrl: '/maiganhua/she.jpg',
    description: '蛇年出生的人神秘睿智，洞察力强，具有灵活的思维和良好的判断力。'
  },
  { 
    name: '马', 
    imageUrl: '/maiganhua/ma.jpg',
    description: '马年出生的人自由奔放，精力充沛，具有积极向上的生活态度和竞争精神。'
  },
  { 
    name: '羊', 
    imageUrl: '/maiganhua/yang.jpg',
    description: '羊年出生的人温和体贴，富有爱心，具有良好的人际关系和团队合作精神。'
  },
  { 
    name: '猴', 
    imageUrl: '/maiganhua/hou.jpg',
    description: '猴年出生的人聪明灵活，反应敏捷，具有幽默感和创新思维。'
  },
  { 
    name: '鸡', 
    imageUrl: '/maiganhua/ji.jpg',
    description: '鸡年出生的人勤劳诚实，认真负责，具有较强的组织能力和时间观念。'
  },
  { 
    name: '狗', 
    imageUrl: '/maiganhua/gou.jpg',
    description: '狗年出生的人忠诚可靠，正直善良，具有强烈的正义感和保护欲。'
  },
  { 
    name: '猪', 
    imageUrl: '/maiganhua/zhu.jpg',
    description: '猪年出生的人豁达乐观，真诚善良，具有良好的财运和福气。'
  },
];

interface InteractiveZodiacDialProps {
  className?: string;
  onActiveIndexChange?: (index: number) => void;
}

export function InteractiveZodiacDial({ className, onActiveIndexChange }: InteractiveZodiacDialProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0); // 设置默认激活索引
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  
  // 计算每个扇形的角度
  const sectorAngle = 360 / 12;

  // 初始化激活的生肖
  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [onActiveIndexChange]);

  return (
    <div 
      ref={dialRef}
      className={cn(
        'relative left-0 top-0 w-96 h-96 md:w-[500px] md:h-[500px] transition-all duration-300 overflow-hidden rounded-full bg-gradient-to-br from-amber-50 to-amber-200 shadow-2xl',
        className
      )}
    >
      {/* 外圈时辰标记 */}
      {twelveHours.map((hourData, index) => {
        const angle = index * sectorAngle;
        const radians = (angle - 90) * (Math.PI / 180);
        const x = Math.cos(radians) * 0.85 + 0.5;
        const y = Math.sin(radians) * 0.85 + 0.5;
        
        return (
          <div
            key={index}
            className="absolute text-[#3a0c0c] font-bold text-sm md:text-base text-center"
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span>{hourData.hour}</span><br />
            <span className="text-xs opacity-70">{hourData.time}</span>
          </div>
        );
      })}

      {/* 12个生肖扇形区域 */}
      {zodiacImages.map((zodiac, index) => {
        // 排除猪生肖（索引11）
        if (index === 11) return null;
        
        const angle = index * sectorAngle;
        const isActive = activeIndex === index;

        // 计算扇形的起始和结束角度（弧度）
        const startAngle = (angle - sectorAngle / 2) * (Math.PI / 180);
        const endAngle = (angle + sectorAngle / 2) * (Math.PI / 180);
        
        // 计算扇形路径
        const centerX = 50;
        const centerY = 100;
        const radius = 50;
        
        // 计算扇形的四个点
        const startX = centerX + radius * Math.cos(startAngle);
        const startY = centerY + radius * Math.sin(startAngle);
        const endX = centerX + radius * Math.cos(endAngle);
        const endY = centerY + radius * Math.sin(endAngle);
        
        // 创建扇形路径
        const path = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`;

        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center flex-col"
            style={{
              clipPath: `path('${path}')`,
            }}
          >
            <img
              src={zodiac.imageUrl}
              alt={zodiac.name}
              className="mb-2 w-12 h-12 object-contain"
              style={{ transform: `rotate(${-angle}deg)` }}
            />
            <span className="font-bold text-[#3a0c0c]" style={{ transform: `rotate(${-angle}deg)` }}>{zodiac.name}</span>
            <span className="text-xs opacity-70" style={{ transform: `rotate(${-angle}deg)` }}>{twelveHours[index].hour}</span>
          </div>
        );
      })}
    </div>
  );
}