'use client';

import Container from '@/components/layout/container';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface EnhanceSpecificImagePageProps {
  params: {
    locale: Locale;
  };
}

export default function EnhanceSpecificImagePage() {
  const t = useTranslations('ImageEnhancement');
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const imageUrl = '/maiganhua/shouye2.jpg';

  const enhanceImage = async () => {
    setLoading(true);
    try {
      // Fetch the image first
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create FormData with the image
      const formData = new FormData();
      formData.append('image', blob, 'shouye2.jpg');
      
      // Send to our enhancement API
      const enhanceResponse = await fetch('/api/enhance-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!enhanceResponse.ok) {
        throw new Error('Failed to enhance image');
      }
      
      // Convert the response to a blob and create a URL
      const enhancedBlob = await enhanceResponse.blob();
      const enhancedUrl = URL.createObjectURL(enhancedBlob);
      setEnhancedImage(enhancedUrl);
    } catch (error) {
      console.error('Error enhancing image:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-enhance the image on page load
  useEffect(() => {
    enhanceImage();
    
    // Cleanup the object URL when component unmounts
    return () => {
      if (enhancedImage) {
        URL.revokeObjectURL(enhancedImage);
      }
    };
  }, []);

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('description')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t('originalImage')}</h2>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt="Original Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t('enhancedImage')}</h2>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-dashed">
              {loading ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t('uploading')}
                </div>
              ) : enhancedImage ? (
                <Image
                  src={enhancedImage}
                  alt="Enhanced Image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t('noImage')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
