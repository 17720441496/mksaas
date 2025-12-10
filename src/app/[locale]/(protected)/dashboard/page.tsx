import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SectionCards } from '@/components/dashboard/section-cards';
import { getSession } from '@/lib/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from 'next-intl';

import data from './data.json';

/**
 * Dashboard page
 *
 * NOTICE: This is a demo page for the dashboard, no real data is used,
 * we will show real data in the future
 * 
 * For users with role 'user', redirect to orders page
 * For users with role 'admin', show the dashboard
 */
export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  
  // If user role is 'user', redirect to orders page
  if (session?.user?.role === 'user') {
    redirect(`/${locale}/orders`);
  }

  const t = await getTranslations();

  const breadcrumbs = [
    {
      label: t('Dashboard.dashboard.title'),
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
