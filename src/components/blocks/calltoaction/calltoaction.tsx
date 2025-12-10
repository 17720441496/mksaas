'use client'

import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export default function CallToActionSection() {
  const t = useTranslations('HomePage.calltoaction');

  // 创建表单组件作为客户端组件
  const CustomForm = () => {
    const form = useForm({
      defaultValues: {
        name: '',
        phone: '',
        email: '',
        consultationType: '作品购买咨询',
        '需求描述': ''
      }
    });

    const onSubmit = (data: any) => {
      console.log(data);
      // 这里可以添加表单提交逻辑
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: '请输入姓名' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入姓名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              rules={{ required: '请输入电话' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>电话</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入电话" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入邮箱" {...field} />
                </FormControl>
                <FormDescription>选填</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consultationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>咨询类型</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择咨询类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="作品购买咨询">作品购买咨询</SelectItem>
                    <SelectItem value="定制服务咨询">定制服务咨询</SelectItem>
                    <SelectItem value="技术支持">技术支持</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="需求描述"
            render={({ field }) => (
              <FormItem>
                <FormLabel>需求描述</FormLabel>
                <FormControl>
                  <Textarea placeholder="请详细描述您的需求" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-8 py-6 rounded-md flex items-center gap-2">
              提交定制需求
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <section id="call-to-action" className="px-4 py-24 bg-muted/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            在线定制咨询
          </h2>
          <div className="mt-12">
            <CustomForm />
          </div>
        </div>
      </div>
    </section>
  );
}
