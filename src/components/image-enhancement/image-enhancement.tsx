'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MAX_FILE_SIZE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Download, Image as ImageIcon, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface ImageEnhancementProps {
  className?: string;
}

export function ImageEnhancement({ className }: ImageEnhancementProps) {
  const t = useTranslations('ImageEnhancement');
  const [isUploading, setIsUploading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [originalImage, setOriginalImage] = useState<string | undefined>('');
  const [enhancedImage, setEnhancedImage] = useState<string | undefined>('');
  const [tempImageUrl, setTempImageUrl] = useState<string | undefined>('');

  const handleUploadClick = () => {
    // Create a hidden file input and trigger it
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError('');
    setEnhancedImage(undefined);

    try {
      // Pre-check file size on client side
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds the server limit');
      }

      // Create a temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      setTempImageUrl(tempUrl);
      setOriginalImage(tempUrl);

      // Enhance the image
      await enhanceImage(file);
    } catch (error) {
      console.error('Image upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      setError(errorMessage);
      setOriginalImage(undefined);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const enhanceImage = async (file: File) => {
    setIsEnhancing(true);

    try {
      // Create form data with the image
      const formData = new FormData();
      formData.append('image', file);

      // Send the image to the enhancement API
      const response = await fetch('/api/enhance-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to enhance image');
      }

      // Convert response to blob and create a URL for the enhanced image
      const enhancedBlob = await response.blob();
      const enhancedUrl = URL.createObjectURL(enhancedBlob);
      setEnhancedImage(enhancedUrl);

      toast.success('Image enhanced successfully!');
    } catch (error) {
      console.error('Image enhancement error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to enhance image';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = () => {
    if (!enhancedImage) return;

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={cn('w-full overflow-hidden py-0 pt-6 flex flex-col', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {!originalImage ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">
                {t('noImage')}
              </p>
              <Button
                variant="secondary"
                onClick={handleUploadClick}
                disabled={isUploading || isEnhancing}
                className="mt-2"
              >
                {isUploading ? t('uploading') : t('uploadButton')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('originalImage')}</h3>
                <div className="aspect-square overflow-hidden rounded-lg border">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('enhancedImage')}</h3>
                <div className="aspect-square overflow-hidden rounded-lg border">
                  {isEnhancing ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : enhancedImage ? (
                    <img
                      src={enhancedImage}
                      alt="Enhanced"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={handleUploadClick}
                disabled={isUploading || isEnhancing}
              >
                <Upload className="mr-2 h-4 w-4" />
                {t('uploadNew')}
              </Button>
              {enhancedImage && (
                <Button
                  onClick={handleDownload}
                  disabled={isEnhancing}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('download')}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
