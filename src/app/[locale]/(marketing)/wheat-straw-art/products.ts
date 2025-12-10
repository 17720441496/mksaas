

// 定义产品分类枚举
export enum ProductCategory {
  ZODIAC = 'zodiac',
  SCENERY = 'scenery',
  FLOWER = 'flower',
  ANIMAL = 'animal',
  CUSTOM = 'custom'
}

// 定义产品数据模型
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  yearRange?: string;
  artist?: string;
  size?: string;
  material?: string;
  productionTime?: string;
  features?: string[];
  details?: string[];
}

// 创建模拟数据
export const products: Product[] = [
  // 十二生肖系列
  {
    id: 'zodiac-001',
    name: '鼠年麦秆画',
    description: '栩栩如生的鼠年麦秆画，寓意招财进宝，吉祥如意。',
    price: 299,
    originalPrice: 399,
    image: '/maiganhua/shengxiao/shu.jpg',
    category: ProductCategory.ZODIAC,
    stock: 50,
    rating: 4.8,
    reviews: 120,
    tags: ['生肖', '鼠', '招财'],
    yearRange: '2020, 2008, 1996',
    artist: '张大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-002',
    name: '牛年麦秆画',
    description: '勤劳奋进的牛年麦秆画，象征着事业蒸蒸日上。',
    price: 329,
    originalPrice: 429,
    image: '/maiganhua/shengxiao/niu.jpg',
    category: ProductCategory.ZODIAC,
    stock: 45,
    rating: 4.9,
    reviews: 95,
    tags: ['生肖', '牛', '奋进'],
    yearRange: '2021, 2009, 1997',
    artist: '李大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-003',
    name: '虎年麦秆画',
    description: '威风凛凛的虎年麦秆画，展现王者风范。',
    price: 359,
    originalPrice: 459,
    image: '/maiganhua/shengxiao/hu.jpg',
    category: ProductCategory.ZODIAC,
    stock: 40,
    rating: 4.7,
    reviews: 110,
    tags: ['生肖', '虎', '王者'],
    yearRange: '2022, 2010, 1998',
    artist: '王大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-004',
    name: '兔年麦秆画',
    description: '可爱灵动的兔年麦秆画，寓意吉祥如意。',
    price: 299,
    originalPrice: 399,
    image: '/maiganhua/shengxiao/tu.jpg',
    category: ProductCategory.ZODIAC,
    stock: 55,
    rating: 4.9,
    reviews: 130,
    tags: ['生肖', '兔', '吉祥'],
    yearRange: '2023, 2011, 1999',
    artist: '赵大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-005',
    name: '龙年麦秆画',
    description: '腾云驾雾的龙年麦秆画，象征着权威和尊贵。',
    price: 499,
    originalPrice: 599,
    image: '/maiganhua/shengxiao/long.jpg',
    category: ProductCategory.ZODIAC,
    stock: 30,
    rating: 5.0,
    reviews: 85,
    tags: ['生肖', '龙', '权威'],
    yearRange: '2024, 2012, 2000',
    artist: '刘大师',
    size: '50x60cm',
    material: '优质麦秆',
    productionTime: '10天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-006',
    name: '蛇年麦秆画',
    description: '神秘优雅的蛇年麦秆画，寓意智慧和长寿。',
    price: 329,
    originalPrice: 429,
    image: '/maiganhua/shengxiao/she.jpg',
    category: ProductCategory.ZODIAC,
    stock: 45,
    rating: 4.7,
    reviews: 90,
    tags: ['生肖', '蛇', '智慧'],
    yearRange: '2025, 2013, 2001',
    artist: '陈大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-007',
    name: '马年麦秆画',
    description: '奔腾不息的马年麦秆画，象征着事业成功，马到成功。',
    price: 359,
    originalPrice: 459,
    image: '/maiganhua/shengxiao/ma.jpg',
    category: ProductCategory.ZODIAC,
    stock: 40,
    rating: 4.8,
    reviews: 105,
    tags: ['生肖', '马', '成功'],
    yearRange: '2026, 2014, 2002',
    artist: '杨大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-008',
    name: '羊年麦秆画',
    description: '温顺可爱的羊年麦秆画，寓意平安吉祥，幸福美满。',
    price: 299,
    originalPrice: 399,
    image: '/maiganhua/shengxiao/yang.jpg',
    category: ProductCategory.ZODIAC,
    stock: 50,
    rating: 4.9,
    reviews: 125,
    tags: ['生肖', '羊', '平安'],
    yearRange: '2027, 2015, 2003',
    artist: '黄大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-009',
    name: '猴年麦秆画',
    description: '聪明伶俐的猴年麦秆画，寓意机智灵活，事业顺利。',
    price: 329,
    originalPrice: 429,
    image: '/maiganhua/shengxiao/hou.jpg',
    category: ProductCategory.ZODIAC,
    stock: 45,
    rating: 4.7,
    reviews: 95,
    tags: ['生肖', '猴', '聪明'],
    yearRange: '2028, 2016, 2004',
    artist: '吴大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-010',
    name: '鸡年麦秆画',
    description: '雄赳赳气昂昂的鸡年麦秆画，寓意吉祥如意，前程似锦。',
    price: 299,
    originalPrice: 399,
    image: '/maiganhua/shengxiao/ji.jpg',
    category: ProductCategory.ZODIAC,
    stock: 55,
    rating: 4.8,
    reviews: 110,
    tags: ['生肖', '鸡', '吉祥'],
    yearRange: '2029, 2017, 2005',
    artist: '周大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-011',
    name: '狗年麦秆画',
    description: '忠诚可靠的狗年麦秆画，寓意家庭和睦，平安吉祥。',
    price: 329,
    originalPrice: 429,
    image: '/maiganhua/shengxiao/gou.jpg',
    category: ProductCategory.ZODIAC,
    stock: 45,
    rating: 4.9,
    reviews: 100,
    tags: ['生肖', '狗', '忠诚'],
    yearRange: '2030, 2018, 2006',
    artist: '郑大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'zodiac-012',
    name: '猪年麦秆画',
    description: '憨厚可爱的猪年麦秆画，寓意财源广进，福气满满。',
    price: 299,
    originalPrice: 399,
    image: '/maiganhua/shengxiao/zhu.jpg',
    category: ProductCategory.ZODIAC,
    stock: 50,
    rating: 4.7,
    reviews: 115,
    tags: ['生肖', '猪', '福气'],
    yearRange: '2031, 2019, 2007',
    artist: '王大师',
    size: '40x50cm',
    material: '优质麦秆',
    productionTime: '7天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  // 风景系列
  {
    id: 'scenery-001',
    name: '山水风光麦秆画',
    description: '秀丽的山水风光麦秆画，展现大自然的壮美景色。',
    price: 499,
    originalPrice: 599,
    image: '/maiganhua/fengjing1.jpg',
    category: ProductCategory.SCENERY,
    stock: 30,
    rating: 4.9,
    reviews: 85,
    tags: ['风景', '山水', '自然'],
    artist: '张大师',
    size: '60x80cm',
    material: '优质麦秆',
    productionTime: '15天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  {
    id: 'scenery-002',
    name: '乡村田野麦秆画',
    description: '宁静的乡村田野麦秆画，感受田园生活的美好。',
    price: 459,
    originalPrice: 559,
    image: '/maiganhua/fengjing2.jpg',
    category: ProductCategory.SCENERY,
    stock: 35,
    rating: 4.8,
    reviews: 90,
    tags: ['风景', '乡村', '田园'],
    artist: '李大师',
    size: '50x70cm',
    material: '优质麦秆',
    productionTime: '12天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  // 花卉系列
  {
    id: 'flower-001',
    name: '牡丹花开麦秆画',
    description: '雍容华贵的牡丹花开麦秆画，象征着富贵吉祥。',
    price: 399,
    originalPrice: 499,
    image: '/maiganhua/huahui1.jpg',
    category: ProductCategory.FLOWER,
    stock: 40,
    rating: 4.9,
    reviews: 100,
    tags: ['花卉', '牡丹', '富贵'],
    artist: '王大师',
    size: '50x60cm',
    material: '优质麦秆',
    productionTime: '10天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  },
  // 动物系列
  {
    id: 'animal-001',
    name: '孔雀开屏麦秆画',
    description: '绚丽多彩的孔雀开屏麦秆画，展现大自然的美丽。',
    price: 459,
    originalPrice: 559,
    image: '/maiganhua/dongwu1.jpg',
    category: ProductCategory.ANIMAL,
    stock: 35,
    rating: 4.8,
    reviews: 95,
    tags: ['动物', '孔雀', '美丽'],
    artist: '刘大师',
    size: '50x70cm',
    material: '优质麦秆',
    productionTime: '12天',
    features: ['手工制作', '环保材料', '精美包装'],
    details: ['采用传统工艺', '色彩鲜艳', '立体感强']
  }
];

// 根据分类获取产品
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

// 根据ID获取产品
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// 获取热门产品
export const getPopularProducts = (limit: number = 8): Product[] => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

// 获取促销产品
export const getPromotedProducts = (limit: number = 6): Product[] => {
  return products.filter(product => product.originalPrice && product.originalPrice > product.price).slice(0, limit);
};
