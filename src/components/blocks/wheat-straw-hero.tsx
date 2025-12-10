import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WheatStrawHero() {
  const t = useTranslations('HomePage.wheatStrawHero');

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950" />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900 px-4 py-2 text-sm font-medium text-amber-900 dark:text-amber-100">
            <Sparkles className="h-4 w-4" />
            {t('badge')}
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl">
            {t('description')}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="text-base cursor-pointer">
              <LocaleLink href="/wheat-straw">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </LocaleLink>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="text-base cursor-pointer">
              <LocaleLink href="/pricing">
                {t('viewPricing')}
              </LocaleLink>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">🎨</div>
              <h3 className="mb-1 font-semibold">{t('feature1Title')}</h3>
              <p className="text-sm text-muted-foreground">{t('feature1Desc')}</p>
            </div>
            
            <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">🚀</div>
              <h3 className="mb-1 font-semibold">{t('feature2Title')}</h3>
              <p className="text-sm text-muted-foreground">{t('feature2Desc')}</p>
            </div>
            
            <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">📦</div>
              <h3 className="mb-1 font-semibold">{t('feature3Title')}</h3>
              <p className="text-sm text-muted-foreground">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

