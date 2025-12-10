'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  AudioLinesIcon,
  BuildingIcon,
  ChartNoAxesCombinedIcon,
  CircleDollarSignIcon,
  CircleHelpIcon,
  ComponentIcon,
  CookieIcon,
  FileTextIcon,
  FilmIcon,
  FlameIcon,
  FootprintsIcon,
  ImageIcon,
  ListChecksIcon,
  LockKeyholeIcon,
  LogInIcon,
  MailIcon,
  MailboxIcon,
  MessageCircleIcon,
  NewspaperIcon,
  RocketIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  SplitSquareVerticalIcon,
  SquareCodeIcon,
  SquareKanbanIcon,
  SquarePenIcon,
  ThumbsUpIcon,
  UserPlusIcon,
  UsersIcon,
  WandSparklesIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/navbar
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: '麦秆画产品',
      href: '/products',
      external: false,
    },
    {
      title: '定制服务',
      href: '/customize',
      external: false,
    },
    {
      title: '麦秆画艺术',
      items: [
        {
          title: '关于麦秆画',
          description: '了解麦秆画的历史和文化',
          icon: <BuildingIcon className="size-4 shrink-0" />,
          href: '/about-wheat-art',
          external: false,
        },
        {
          title: '艺术家作品',
          description: '欣赏艺术家的精美作品',
          icon: <ImageIcon className="size-4 shrink-0" />,
          href: '/artist-works',
          external: false,
        },
        {
          title: '制作工艺',
          description: '了解麦秆画的制作过程',
          icon: <SquarePenIcon className="size-4 shrink-0" />,
          href: '/craftsmanship',
          external: false,
        },
      ],
    },
    {
      title: '购物指南',
      items: [
        {
          title: '如何购买',
          description: '了解购买流程',
          icon: <CircleDollarSignIcon className="size-4 shrink-0" />,
          href: '/how-to-buy',
          external: false,
        },
        {
          title: '定制流程',
          description: '了解定制麦秆画的步骤',
          icon: <ListChecksIcon className="size-4 shrink-0" />,
          href: '/custom-process',
          external: false,
        },
        {
          title: '常见问题',
          description: '解答您的疑问',
          icon: <CircleHelpIcon className="size-4 shrink-0" />,
          href: Routes.FAQ,
          external: false,
        },
      ],
    },
    {
      title: '关于我们',
      items: [
        {
          title: '公司介绍',
          description: '了解我们的公司',
          icon: <BuildingIcon className="size-4 shrink-0" />,
          href: Routes.About,
          external: false,
        },
        {
          title: '联系我们',
          description: '与我们取得联系',
          icon: <MailIcon className="size-4 shrink-0" />,
          href: Routes.Contact,
          external: false,
        },
      ],
    },
    // {
    //   title: t('blocks.title'),
    //   items: [
    //     {
    //       title: t('blocks.items.magicui.title'),
    //       icon: <ComponentIcon className="size-4 shrink-0" />,
    //       href: Routes.MagicuiBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.hero-section.title'),
    //       icon: <FlameIcon className="size-4 shrink-0" />,
    //       href: Routes.HeroBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.logo-cloud.title'),
    //       icon: <SquareCodeIcon className="size-4 shrink-0" />,
    //       href: Routes.LogoCloudBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.features.title'),
    //       icon: <WandSparklesIcon className="size-4 shrink-0" />,
    //       href: Routes.FeaturesBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.integrations.title'),
    //       icon: <SnowflakeIcon className="size-4 shrink-0" />,
    //       href: Routes.IntegrationsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.content.title'),
    //       icon: <NewspaperIcon className="size-4 shrink-0" />,
    //       href: Routes.ContentBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.stats.title'),
    //       icon: <ChartNoAxesCombinedIcon className="size-4 shrink-0" />,
    //       href: Routes.StatsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.team.title'),
    //       icon: <UsersIcon className="size-4 shrink-0" />,
    //       href: Routes.TeamBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.testimonials.title'),
    //       icon: <ThumbsUpIcon className="size-4 shrink-0" />,
    //       href: Routes.TestimonialsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.callToAction.title'),
    //       icon: <RocketIcon className="size-4 shrink-0" />,
    //       href: Routes.CallToActionBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.footer.title'),
    //       icon: <FootprintsIcon className="size-4 shrink-0" />,
    //       href: Routes.FooterBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.pricing.title'),
    //       icon: <CircleDollarSignIcon className="size-4 shrink-0" />,
    //       href: Routes.PricingBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.comparator.title'),
    //       icon: <SplitSquareVerticalIcon className="size-4 shrink-0" />,
    //       href: Routes.ComparatorBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.faq.title'),
    //       icon: <CircleHelpIcon className="size-4 shrink-0" />,
    //       href: Routes.FAQBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.login.title'),
    //       icon: <LogInIcon className="size-4 shrink-0" />,
    //       href: Routes.LoginBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.signup.title'),
    //       icon: <UserPlusIcon className="size-4 shrink-0" />,
    //       href: Routes.SignupBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.forgot-password.title'),
    //       icon: <LockKeyholeIcon className="size-4 shrink-0" />,
    //       href: Routes.ForgotPasswordBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.contact.title'),
    //       icon: <MailIcon className="size-4 shrink-0" />,
    //       href: Routes.ContactBlocks,
    //       external: false,
    //     },
    //   ],
    // },
  ];
}
