import { useTranslations } from 'next-intl';
import ServiceFeatures from '@/components/custom/ServiceFeatures';

export default function TestimonialsSection() {
  const t = useTranslations('HomePage.testimonials');

  return (
    <section id="testimonials" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <ServiceFeatures />
      </div>
    </section>
  );
}
