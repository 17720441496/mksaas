import Container from '@/components/layout/container';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ContactSection from '@/components/custom/ContactSection';
import { CustomTextEffect } from '@/components/custom/text-effect';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const pt = await getTranslations({ locale, namespace: 'ContactPage' });

  return constructMetadata({
    title: pt('title') + ' | ' + t('title'),
    description: pt('description'),
    locale,
    pathname: '/contact',
  });
}

/**
 * inspired by https://nsui.irung.me/contact
 */
export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <div className="py-12">
      <Container className="px-4">
        <div className="mx-auto max-w-4xl space-y-12 pb-16">
          {/* Header with text effect */}
          <div className="space-y-6">
              <h1 className="text-center text-4xl font-bold tracking-tight">
                <CustomTextEffect preset="fade-in-blur" per="line" delay={0.1}>
                  {t('title')}
                </CustomTextEffect>
              </h1>
              <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
                <CustomTextEffect preset="fade-in-blur" per="line" delay={0.2}>
                  {t('subtitle')}
                </CustomTextEffect>
              </p>
            </div>

          {/* Custom Contact Section */}
          <ContactSection />
        </div>
      </Container>
    </div>
  );
}
