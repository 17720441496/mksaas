import { defaultMessages } from '@/i18n/messages';
import { routing } from '@/i18n/routing';
import EmailButton from '@/mail/components/email-button';
import EmailLayout from '@/mail/components/email-layout';
import type { BaseEmailProps } from '@/mail/types';
import { Text, Section, Img } from '@react-email/components';
import { createTranslator } from 'use-intl/core';

interface WheatStrawOrderConfirmationProps extends BaseEmailProps {
  orderNumber: string;
  customerName: string;
  imageUrl: string;
  totalPrice: number;
  currency: string;
  orderUrl: string;
}

export default function WheatStrawOrderConfirmation({
  orderNumber,
  customerName,
  imageUrl,
  totalPrice,
  currency,
  orderUrl,
  locale,
  messages,
}: WheatStrawOrderConfirmationProps) {
  const t = createTranslator({
    locale,
    messages,
    namespace: 'Mail.wheatStrawOrderConfirmation',
  });

  return (
    <EmailLayout locale={locale} messages={messages}>
      <Text style={heading}>{t('title', { name: customerName })}</Text>
      <Text style={paragraph}>
        {t('body', { orderNumber })}
      </Text>
      
      <Section style={imageSection}>
        <Img
          src={imageUrl}
          width="400"
          height="400"
          alt="Wheat Straw Painting"
          style={image}
        />
      </Section>

      <Section style={priceSection}>
        <Text style={priceText}>
          {t('totalAmount')}: ${(totalPrice / 100).toFixed(2)} {currency}
        </Text>
      </Section>

      <Text style={paragraph}>
        {t('productionNotice')}
      </Text>

      <EmailButton href={orderUrl}>{t('viewOrder')}</EmailButton>
      
      <Text style={footer}>
        {t('thankYou')}
      </Text>
    </EmailLayout>
  );
}

WheatStrawOrderConfirmation.PreviewProps = {
  locale: routing.defaultLocale,
  messages: defaultMessages,
  orderNumber: 'WS202401010001',
  customerName: 'John Doe',
  imageUrl: 'https://via.placeholder.com/400',
  totalPrice: 9900,
  currency: 'USD',
  orderUrl: 'https://mksaas.com/orders/123',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '16px',
};

const imageSection = {
  margin: '20px 0',
  textAlign: 'center' as const,
};

const image = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const priceSection = {
  backgroundColor: '#f3f4f6',
  padding: '16px',
  borderRadius: '8px',
  margin: '20px 0',
};

const priceText = {
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0',
};

const footer = {
  fontSize: '14px',
  color: '#666',
  marginTop: '30px',
};

