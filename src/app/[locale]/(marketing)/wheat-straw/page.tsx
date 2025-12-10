import { WheatStrawGenerator } from '@/ai/image/components/WheatStrawGenerator';
import { getTranslations } from 'next-intl/server';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WheatStraw' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function WheatStrawPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="container mx-auto py-8">
      <WheatStrawGenerator locale={locale as 'en' | 'zh'} />
    </div>
  );
}

