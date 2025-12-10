import Container from '@/components/layout/container';
import { ImageEnhancement } from '@/components/image-enhancement/image-enhancement';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface ImageEnhancementPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params: { locale } }: ImageEnhancementPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('title')} - Image Enhancement`,
    description: t('description'),
  });
}

export default async function ImageEnhancementPage() {
  const t = await getTranslations('ImageEnhancement');

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('description')}</p>
        <ImageEnhancement />
      </div>
    </Container>
  );
}
