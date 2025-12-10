'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 定义表单数据类型
interface FormData {
  name: string;
  email: string;
  message: string;
}

// 定义组件属性
interface ContactSectionProps {
  onSubmit?: (formData: FormData) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onSubmit }) => {
  // 表单状态管理
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // 表单输入变化处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '请输入您的留言';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟API调用
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // 默认处理：打印表单数据
        console.log('表单提交数据:', formData);
        
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // 提交成功
      setSubmitSuccess(true);
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // 3秒后隐藏成功提示
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('表单提交失败:', error);
      // 可以添加错误提示
    } finally {
      setIsSubmitting(false);
    }
  };

  // 定义表单动画变体
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    focus: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">联系我们</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            如果您对我们的麦秆画作品感兴趣，或者有任何问题需要咨询，请随时联系我们。
            我们的工作人员会在第一时间回复您的消息。
          </p>
        </motion.div>

        {/* 表单区域 */}
        <div className="max-w-3xl mx-auto">
          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            {/* 姓名输入 */}
            <motion.div variants={inputVariants} className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="请输入您的姓名"
                whileFocus="focus"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </motion.div>

            {/* 邮箱输入 */}
            <motion.div variants={inputVariants} className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="请输入您的邮箱"
                whileFocus="focus"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* 留言输入 */}
            <motion.div variants={inputVariants} className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                留言
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="请输入您的留言内容"
                whileFocus="focus"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </motion.div>

            {/* 提交按钮 */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:bg-yellow-400 disabled:cursor-not-allowed`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {isSubmitting ? '提交中...' : '发送留言'}
            </motion.button>
          </motion.form>

          {/* 提交成功提示 */}
          {submitSuccess && (
            <motion.div
              className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              留言提交成功！我们会尽快与您联系。
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;