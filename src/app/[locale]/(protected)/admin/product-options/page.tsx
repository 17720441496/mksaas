'use client';

import { getProductOptions } from '@/actions/get-product-options';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductOptionsPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  
  const [options, setOptions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOptions() {
      try {
        const result = await getProductOptions();
        setOptions(result);
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadOptions();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <p>{locale === 'zh' ? '加载中...' : 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {locale === 'zh' ? '产品规格管理' : 'Product Options Management'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'zh' ? '管理麦秆画产品的尺寸、边框和装裱选项' : 'Manage sizes, frames, and mounting options for wheat straw paintings'}
          </p>
        </div>

        {/* Size Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {locale === 'zh' ? '尺寸选项' : 'Size Options'}
            </CardTitle>
            <CardDescription>
              {locale === 'zh' ? '配置可用的尺寸及价格' : 'Configure available sizes and pricing'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {options?.size?.length > 0 ? (
              <div className="space-y-2">
                {options.size.map((option: any) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {locale === 'zh' ? option.nameZh : option.name}
                      </p>
                      {option.description && (
                        <p className="text-sm text-muted-foreground">
                          {locale === 'zh' ? option.descriptionZh : option.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {option.priceAdjustment !== 0 && (
                        <Badge variant="outline">
                          +${(option.priceAdjustment / 100).toFixed(2)}
                        </Badge>
                      )}
                      {option.enabled && (
                        <Badge variant="default">
                          {locale === 'zh' ? '启用' : 'Enabled'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                {locale === 'zh' ? '暂无尺寸选项' : 'No size options available'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Frame Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {locale === 'zh' ? '边框选项' : 'Frame Options'}
            </CardTitle>
            <CardDescription>
              {locale === 'zh' ? '配置可用的边框及价格' : 'Configure available frames and pricing'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {options?.frame?.length > 0 ? (
              <div className="space-y-2">
                {options.frame.map((option: any) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {locale === 'zh' ? option.nameZh : option.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {option.priceAdjustment !== 0 && (
                        <Badge variant="outline">
                          +${(option.priceAdjustment / 100).toFixed(2)}
                        </Badge>
                      )}
                      {option.enabled && (
                        <Badge variant="default">
                          {locale === 'zh' ? '启用' : 'Enabled'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                {locale === 'zh' ? '暂无边框选项' : 'No frame options available'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Mounting Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {locale === 'zh' ? '装裱选项' : 'Mounting Options'}
            </CardTitle>
            <CardDescription>
              {locale === 'zh' ? '配置可用的装裱方式及价格' : 'Configure available mounting options and pricing'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {options?.mounting?.length > 0 ? (
              <div className="space-y-2">
                {options.mounting.map((option: any) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {locale === 'zh' ? option.nameZh : option.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {option.priceAdjustment !== 0 && (
                        <Badge variant="outline">
                          +${(option.priceAdjustment / 100).toFixed(2)}
                        </Badge>
                      )}
                      {option.enabled && (
                        <Badge variant="default">
                          {locale === 'zh' ? '启用' : 'Enabled'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                {locale === 'zh' ? '暂无装裱选项' : 'No mounting options available'}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {locale === 'zh' 
              ? '注意：产品选项数据需要通过数据库直接管理。请使用数据库管理工具添加、编辑或删除选项。'
              : 'Note: Product options need to be managed directly through the database. Please use database management tools to add, edit, or remove options.'}
          </p>
        </div>
      </div>
    </div>
  );
}

