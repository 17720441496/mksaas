import Container from '@/components/layout/container';
import { websiteConfig } from '@/config/website';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/custom/HeroSection';
import ArtCategorySlider from '@/components/custom/ArtCategorySlider';
import { InteractiveZodiacDial } from '@/components/custom/InteractiveZodiacDial';
import { CustomTextEffect } from '@/components/custom/text-effect';
import { CustomHighlightText } from '@/components/custom/highlight';
import { motion } from 'framer-motion';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const pt = await getTranslations({ locale, namespace: 'AboutPage' });

  return constructMetadata({
    title: '关于麦秆画 | ' + t('title'),
    description: '了解麦秆画的历史、制作工艺和我们的团队',
    locale,
    pathname: '/about',
  });
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  // Hero section images
  const heroImages = [
    {
      id: 1,
      imageUrl: '/maiganhua/shouye1.jpg',
      altText: '麦秆画展示',
      title: '麦秆画艺术',
      description: '精美的麦秆画作品',
    },
    {
      id: 2,
      imageUrl: '/maiganhua/shouye2.jpg',
      altText: '麦秆画展示',
      title: '传统工艺',
      description: '传统工艺的现代演绎',
    },
    {
      id: 3,
      imageUrl: '/maiganhua/1.jpg',
      altText: '麦秆画展示',
      title: '手工制作',
      description: '纯手工制作的麦秆画',
    },
  ];

  // Art categories for the slider
  const artCategories = [
    { id: '1', title: '十二生肖', imageUrl: '/maiganhua/shengxiao/1.jpg', description: '传统生肖麦秆画', color: '#FF6B6B' },
    { id: '2', title: '花鸟虫鱼', imageUrl: '/maiganhua/huaniao.jpg', description: '自然题材麦秆画', color: '#4ECDC4' },
    { id: '3', title: '人物故事', imageUrl: '/maiganhua/renwu.jpg', description: '历史人物麦秆画', color: '#45B7D1' },
    { id: '4', title: '山水风景', imageUrl: '/maiganhua/12.jpg', description: '山水风光麦秆画', color: '#96CEB4' },
    { id: '5', title: '动物世界', imageUrl: '/maiganhua/10.jpg', description: '动物题材麦秆画', color: '#FFA07A' },
    { id: '6', title: '现代艺术', imageUrl: '/maiganhua/16.png', description: '现代风格麦秆画', color: '#98D8C8' },
  ];

  // Production process steps
  const productionSteps = [
    { 
      id: 1, 
      title: '选材', 
      description: '精选优质麦秆，要求色泽金黄、质地坚韧、粗细均匀',
      icon: '🌾'
    },
    { 
      id: 2, 
      title: '浸泡', 
      description: '将麦秆放入水中浸泡，使其变得柔软有韧性，便于后续加工',
      icon: '💧'
    },
    { 
      id: 3, 
      title: '刮皮', 
      description: '用专用工具刮去麦秆表面的外皮，露出内部的麦秆芯',
      icon: '✂️'
    },
    { 
      id: 4, 
      title: '劈秆', 
      description: '将麦秆劈成细条，根据需要调整宽度和厚度',
      icon: '🪓'
    },
    { 
      id: 5, 
      title: '熨烫', 
      description: '使用电熨斗对麦秆进行熨烫，使其平整并呈现出自然的光泽',
      icon: '🖨️'
    },
    { 
      id: 6, 
      title: '剪切', 
      description: '根据设计图案，将麦秆剪切出各种形状和大小',
      icon: '✂️'
    },
    { 
      id: 7, 
      title: '粘贴', 
      description: '使用专用胶水将麦秆粘贴在画布上，组成精美的图案',
      icon: '🧩'
    },
    { 
      id: 8, 
      title: '装裱', 
      description: '将完成的麦秆画进行装裱，使其更加美观和易于保存',
      icon: '🖼️'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection heroImages={heroImages} />
      
      <Container className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* About section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                <CustomTextEffect preset="fade-in-blur" per="line">麦秆画的历史与传承</CustomTextEffect>
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  麦秆画是中国传统的民间艺术形式，起源于<CustomHighlightText text="隋唐时期" className="bg-amber-100 hover:bg-amber-200 transition-colors" />，已有<CustomHighlightText text="1500多年" className="bg-amber-100 hover:bg-amber-200 transition-colors" />的历史。它利用麦秆的天然光泽和纹理，通过剪切、粘贴、熨烫等工艺，创作出精美的艺术作品。
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  麦秆画最初是农民在农闲时创作的民间工艺品，后来逐渐发展成为一种独特的艺术形式。在<CustomHighlightText text="明清时期" className="bg-amber-100 hover:bg-amber-200 transition-colors" />，麦秆画曾作为贡品进献给皇室，受到贵族的喜爱。
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  如今，麦秆画已被列入<CustomHighlightText text="非物质文化遗产" className="bg-amber-100 hover:bg-amber-200 transition-colors" />保护名录，我们致力于传承和创新这一古老的艺术形式，将传统工艺与现代设计相结合，打造出既有文化底蕴又符合现代审美的艺术精品。
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Production Process Section */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              <CustomTextEffect preset="fade-in-blur" per="line">麦秆画制作工艺</CustomTextEffect>
            </h2>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
              每一幅麦秆画都经过精心设计和制作，从选材到成品需要经过数十道工序，充分展现了麦秆的自然之美和艺术家的精湛技艺。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productionSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Art Categories Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <CustomTextEffect preset="fade-in-blur" per="line">我们的艺术分类</CustomTextEffect>
            </h2>
            <ArtCategorySlider categories={artCategories} />
          </div>
          
          {/* Team Section */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              <CustomTextEffect preset="fade-in-blur" per="line">我们的团队</CustomTextEffect>
            </h2>
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-lg text-muted-foreground">
                我们是一群热爱麦秆画艺术的年轻人，致力于传承和创新这一古老的民间艺术。
              </p>
              <p className="text-lg text-muted-foreground">
                我们的团队由经验丰富的麦秆画艺术家、设计师和工艺师组成，他们都拥有多年的行业经验和精湛的技艺。
              </p>
              <p className="text-lg">
                我们坚信，<CustomHighlightText text="传统工艺" className="bg-amber-100 hover:bg-amber-200 transition-colors" />需要<CustomHighlightText text="创新" className="bg-amber-100 hover:bg-amber-200 transition-colors" />才能更好地传承，我们将不断探索新的创作方式和表现形式，为麦秆画艺术注入新的活力。
              </p>
            </div>
          </div>
          
          {/* Interactive Zodiac Dial Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <CustomTextEffect preset="fade-in-blur" per="line">十二生肖时辰盘</CustomTextEffect>
            </h2>
            <div className="flex justify-center">
              <InteractiveZodiacDial />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              探索中国传统十二生肖文化，每个生肖都有独特的象征意义和故事
            </p>
          </div>
          
          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-amber-50 rounded-xl p-8 border border-amber-100"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              <CustomTextEffect preset="fade-in-blur" per="line">我们的理念</CustomTextEffect>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">传承经典</h3>
                <p className="text-muted-foreground">继承和发扬麦秆画的传统工艺</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">创新设计</h3>
                <p className="text-muted-foreground">将现代设计理念融入传统艺术</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-2">匠心独运</h3>
                <p className="text-muted-foreground">每一件作品都倾注了我们的心血</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
