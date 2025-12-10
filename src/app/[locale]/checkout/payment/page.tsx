'use client';

import { useEffect, useState } from 'react';
import { useLocaleRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { CheckCircleIcon, AlertCircleIcon, CreditCardIcon, QrCodeIcon } from 'lucide-react';

// 订单类型
interface Order {
  address: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    address: string;
    zipCode: string;
  };
  shippingMethod: string;
  shippingPrice: number;
  totalAmount: number;
  items: Array<{
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
  }>;
}

// 配送方式名称映射
const shippingMethodNames: Record<string, string> = {
  standard: '标准配送',
  express: ' express配送',
  'same-day': '同城当日达',
};

export default function PaymentPage() {
  const localeRouter = useLocaleRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'credit-card'>('alipay');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [showQrCode, setShowQrCode] = useState(true);

  // 从localStorage获取订单信息
  useEffect(() => {
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      try {
        setOrder(JSON.parse(pendingOrder));
      } catch (error) {
        console.error('Failed to parse order data:', error);
        localeRouter.push('/checkout');
      }
    } else {
      localeRouter.push('/checkout');
    }
  }, [localeRouter]);

  // 模拟支付处理
  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // 模拟支付延迟
    setTimeout(() => {
      // 随机模拟支付成功或失败（80%成功率）
      const isSuccess = Math.random() > 0.2;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      
      if (isSuccess) {
        // 清除待处理订单
        localStorage.removeItem('pendingOrder');
        
        // 保存订单到订单历史
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.push({
          ...order,
          id: `ORD-${Date.now()}`,
          orderDate: new Date().toISOString(),
          status: 'paid',
        });
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      }
    }, 3000);
  };

  // 处理返回首页
  const handleBackToHome = () => {
    localeRouter.push('/');
  };

  // 处理查看订单
  const handleViewOrder = () => {
    localeRouter.push('/orders');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#3a0c0c] mb-4">订单信息不存在</h1>
          <button
            onClick={() => localeRouter.push('/checkout')}
            className="bg-[#3a0c0c] text-white px-6 py-3 rounded-lg hover:bg-[#4a1616] transition-colors"
          >
            返回结账页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* 页面标题 */}
          <div className="bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-6 px-8">
            <h1 className="text-3xl font-bold">订单支付</h1>
            <p className="text-gray-200 mt-1">请选择支付方式并完成支付</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：订单信息 */}
              <div className="lg:col-span-2 space-y-8">
                {/* 支付状态 */}
                {paymentStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"
                  >
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-green-800">支付成功！</h3>
                        <p className="text-green-700 mt-1">您的订单已成功支付，我们将尽快为您发货。</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {paymentStatus === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                  >
                    <div className="flex items-start">
                      <AlertCircleIcon className="h-6 w-6 text-red-500 mr-3 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-red-800">支付失败</h3>
                        <p className="text-red-700 mt-1">请检查您的支付信息并重新尝试支付。</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 支付方式 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">选择支付方式</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-5 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'alipay' ? 'border-[#3a0c0c] bg-[#f8f5f0] ring-2 ring-[#3a0c0c]/20' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setPaymentMethod('alipay')}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <QrCodeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium">支付宝</h3>
                        <p className="text-xs text-gray-500 mt-1">扫码支付</p>
                      </div>
                    </div>
                    <div
                      className={`p-5 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'wechat' ? 'border-[#3a0c0c] bg-[#f8f5f0] ring-2 ring-[#3a0c0c]/20' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setPaymentMethod('wechat')}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <QrCodeIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-medium">微信支付</h3>
                        <p className="text-xs text-gray-500 mt-1">扫码支付</p>
                      </div>
                    </div>
                    <div
                      className={`p-5 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'credit-card' ? 'border-[#3a0c0c] bg-[#f8f5f0] ring-2 ring-[#3a0c0c]/20' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setPaymentMethod('credit-card')}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                          <CreditCardIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="font-medium">信用卡</h3>
                        <p className="text-xs text-gray-500 mt-1">在线支付</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 支付详情 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">支付详情</h2>
                  <div className="p-5 border rounded-lg">
                    {paymentMethod === 'credit-card' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">卡号</label>
                          <input
                            type="text"
                            placeholder="**** **** **** ****"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent"
                            disabled={paymentStatus === 'processing'}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">有效期</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent"
                              disabled={paymentStatus === 'processing'}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="***"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent"
                              disabled={paymentStatus === 'processing'}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">持卡人姓名</label>
                          <input
                            type="text"
                            placeholder="与卡上一致"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent"
                            disabled={paymentStatus === 'processing'}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-6">
                        <div className="mb-4">
                          <button
                            onClick={() => setShowQrCode(!showQrCode)}
                            className="text-sm text-[#3a0c0c] hover:underline"
                          >
                            {showQrCode ? '隐藏' : '显示'}支付二维码
                          </button>
                        </div>
                        {showQrCode && (
                          <div className="w-64 h-64 bg-white p-4 border border-gray-200 rounded-lg shadow-md flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center mb-3">
                                <QrCodeIcon className="h-32 w-32 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-500">请使用{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫描二维码支付</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 支付按钮 */}
                    {paymentStatus === 'idle' && (
                      <button
                        onClick={handlePayment}
                        className="w-full mt-6 bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-4 px-6 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        确认支付
                      </button>
                    )}
                    
                    {paymentStatus === 'processing' && (
                      <div className="w-full mt-6 bg-gray-100 text-gray-600 py-4 px-6 rounded-lg text-center font-semibold text-lg">
                        支付处理中...
                      </div>
                    )}
                    
                    {paymentStatus === 'success' && (
                      <div className="w-full mt-6 space-y-3">
                        <button
                          onClick={handleViewOrder}
                          className="w-full bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-4 px-6 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          查看订单
                        </button>
                        <button
                          onClick={handleBackToHome}
                          className="w-full bg-gray-100 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-lg"
                        >
                          返回首页
                        </button>
                      </div>
                    )}
                    
                    {paymentStatus === 'failed' && (
                      <div className="w-full mt-6 space-y-3">
                        <button
                          onClick={() => setPaymentStatus('idle')}
                          className="w-full bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-4 px-6 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          重新支付
                        </button>
                        <button
                          onClick={() => localeRouter.push('/cart')}
                          className="w-full bg-gray-100 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-lg"
                        >
                          返回购物车
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 右侧：订单摘要 */}
              <div className="lg:col-span-1">
                <div className="bg-[#f8f5f0] p-6 rounded-lg sticky top-8">
                  <h2 className="text-xl font-semibold mb-4">订单信息</h2>
                  
                  {/* 收货地址 */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-medium mb-3">收货地址</h3>
                    <p className="text-sm">
                      <span className="font-medium">收货人：</span>{order.address.name} {order.address.phone}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">地址：</span>{order.address.province} {order.address.city} {order.address.district} {order.address.address} {order.address.zipCode}
                    </p>
                  </div>

                  {/* 配送方式 */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-medium mb-3">配送方式</h3>
                    <p className="text-sm">{shippingMethodNames[order.shippingMethod]}</p>
                  </div>

                  {/* 商品列表 */}
                  <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#3a0c0c]">{item.price}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 价格明细 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">商品总价</span>
                      <span className="text-gray-800 font-medium">¥{(order.totalAmount - order.shippingPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">配送费用</span>
                      <span className="text-gray-800 font-medium">
                        {order.shippingPrice > 0 ? `¥${order.shippingPrice.toFixed(2)}` : '免费'}
                      </span>
                    </div>
                    <div className="h-px bg-gray-300 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">支付总额</span>
                      <span className="text-xl font-bold text-[#3a0c0c]">¥{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
