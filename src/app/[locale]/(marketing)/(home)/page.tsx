import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import IntegrationSection from '@/components/blocks/integration/integration';
import Integration2Section from '@/components/blocks/integration/integration2';
import LogoCloud from '@/components/blocks/logo-cloud/logo-cloud';
import PricingSection from '@/components/blocks/pricing/pricing';
import StatsSection from '@/components/blocks/stats/stats';
import TestimonialsSection from '@/components/blocks/testimonials/testimonials';
import CrispChat from '@/components/layout/crisp-chat';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 动态导入HeroSection组件
const HeroSection = dynamic(() => import('@/components/custom/HeroSection'));
// 动态导入ZodiacSection组件
const ZodiacSection = dynamic(() => import('@/components/custom/ZodiacSection'));
// 动态导入使用了客户端API的组件
const ProductCard = dynamic(() => import('@/components/custom/ProductCard'));
import { products, getPopularProducts, getPromotedProducts } from '../wheat-straw-art/products';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  // 首页轮播图数据
  const heroImages = [
    {
      id: 1,
      imageUrl: '/maiganhua/qingming.jpg',
      altText: '清明',
      title: '清明',
      description: '清明主题麦秆画作品，展现传统节日的文化内涵',
    },
    {
      id: 2,
      imageUrl: '/maiganhua/shouye1.jpg',
      altText: '首页图片1',
      title: '麦秆画精品',
      description: '精选麦秆画作品，传统工艺与现代设计的完美结合',
    },
    {
      id: 3,
      imageUrl: '/maiganhua/shouye2.jpg',
      altText: '首页图片2',
      title: '麦秆画艺术',
      description: '源于中国古代的传统艺术形式，通过精湛工艺创作的精美艺术品',
    },
  ];

  // 从产品数据中获取十二生肖产品
  const zodiacs = products.filter(product => product.category === 'zodiac');





  return (
    <>
      <div className="flex flex-col">
        {/* 英雄区轮播 */}
        <HeroSection
          heroImages={heroImages}
          autoPlay={true}
          showDots={true}
          showArrows={true}
        />

        {/* 十二生肖麦秆画展示 */}
      <ZodiacSection
        zodiacs={zodiacs}
      />







        <TestimonialsSection />

        <CallToActionSection />



        <CrispChat />
      </div>
    </>
  );
}
