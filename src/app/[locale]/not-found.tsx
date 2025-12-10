'use client';

import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

/**
 * Note that `app/[locale]/[...rest]/page.tsx`
 * is necessary for this page to render.
 *
 * https://next-intl.dev/docs/environments/error-files#not-foundjs
 * https://next-intl.dev/docs/environments/error-files#catching-non-localized-requests
 */
export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative z-10 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full"
          >
            <Home className="w-24 h-24 text-primary" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-balance text-center text-xl font-medium text-muted-foreground max-w-2xl"
        >
          {t('message')}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button asChild size="lg" variant="default" className="cursor-pointer">
          <LocaleLink href="/">{t('backToHome')}</LocaleLink>
        </Button>
        <Button asChild size="lg" variant="outline">
          <LocaleLink href="/wheat-straw-art">探索麦秆画</LocaleLink> 
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center text-sm text-muted-foreground"
      >
        <p>Or try searching for what you're looking for</p>
      </motion.div>
    </div>
  );
}
