'use client';

import { useState, useEffect } from 'react';
import { useLocaleRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, TruckIcon, ClockIcon, CreditCardIcon } from 'lucide-react';

// 订单类型
interface Order {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  shippingPrice: number;
  shippingMethod: string;
  address: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    address: string;
    zipCode: string;
  };
  items: Array<{
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
  }>;
}

// 订单状态映射
const orderStatusMap: Record<string, { text: string; color: string }> = {
  paid: { text: '已支付', color: 'text-green-600 bg-green-50' },
  pending: { text: '待支付', color: 'text-yellow-600 bg-yellow-50' },
  shipped: { text: '已发货', color: 'text-blue-600 bg-blue-50' },
  delivered: { text: '已送达', color: 'text-purple-600 bg-purple-50' },
  canceled: { text: '已取消', color: 'text-red-600 bg-red-50' },
};

// 配送方式名称映射
const shippingMethodNames: Record<string, string> = {
  standard: '标准配送',
  express: ' express配送',
  'same-day': '同城当日达',
};

export default function OrderHistoryPage() {
  const localeRouter = useLocaleRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  // 从localStorage获取订单历史
  useEffect(() => {
    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      try {
        const parsedOrders = JSON.parse(orderHistory);
        // 按订单日期降序排列
        parsedOrders.sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Failed to parse order history:', error);
      }
    }
  }, []);

  // 切换订单展开/收起状态
  const toggleOrderExpanded = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // 查看订单详情
  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
  };

  // 关闭订单详情
  const closeOrderDetail = () => {
    setSelectedOrder(null);
  };

  // 返回购物车
  const goToCart = () => {
    localeRouter.push('/cart');
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 页面标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#3a0c0c]">我的订单</h1>
            <p className="text-gray-600 mt-2">查看和管理您的所有订单</p>
          </div>

          {/* 空订单状态 */}
          {orders.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <CreditCardIcon className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">您还没有订单</h2>
              <p className="text-gray-600 mb-6">快去购物吧！</p>
              <button
                onClick={goToCart}
                className="bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-3 px-8 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                去购物车
              </button>
            </div>
          )}

          {/* 订单列表 */}
          {orders.length > 0 && (
            <div className="space-y-6">
              {orders.map(order => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: orders.indexOf(order) * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* 订单头部 */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">订单号: {order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${orderStatusMap[order.status]?.color || 'text-gray-600 bg-gray-50'}`}>
                          {orderStatusMap[order.status]?.text || order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{formatDate(order.orderDate)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleOrderExpanded(order.id)}
                            className="text-[#3a0c0c] hover:underline text-sm font-medium"
                          >
                            {expandedOrders[order.id] ? '收起' : '展开详情'}
                          </button>
                          <button
                            onClick={() => viewOrderDetail(order)}
                            className="text-[#3a0c0c] hover:underline text-sm font-medium"
                          >
                            查看详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 订单商品列表 */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 truncate">{item.title}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#3a0c0c]">{item.price}</p>
                            <p className="text-sm text-gray-500">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}

                      {/* 订单总计 */}
                      <div className="flex justify-end pt-4 border-t border-gray-100">
                        <div className="text-right">
                          <div className="flex justify-end gap-8 mb-2">
                            <span className="text-gray-600">商品总价:</span>
                            <span className="font-medium">¥{(order.totalAmount - order.shippingPrice).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-end gap-8 mb-2">
                            <span className="text-gray-600">配送费用:</span>
                            <span className="font-medium">
                              {order.shippingPrice > 0 ? `¥${order.shippingPrice.toFixed(2)}` : '免费'}
                            </span>
                          </div>
                          <div className="h-px bg-gray-300 my-2"></div>
                          <div className="flex justify-end gap-8">
                            <span className="text-gray-600 font-semibold">订单总额:</span>
                            <span className="text-xl font-bold text-[#3a0c0c]">¥{order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 展开详情 */}
                  {expandedOrders[order.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-gray-50 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 收货信息 */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-[#3a0c0c]" />
                            收货信息
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-100">
                            <p className="font-medium">{order.address.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{order.address.phone}</p>
                            <p className="text-sm text-gray-600 mt-2">
                              {order.address.province} {order.address.city} {order.address.district} {order.address.address} {order.address.zipCode}
                            </p>
                          </div>
                        </div>

                        {/* 配送信息 */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <TruckIcon className="h-4 w-4 text-[#3a0c0c]" />
                            配送信息
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-100">
                            <p className="font-medium">{shippingMethodNames[order.shippingMethod]}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {order.shippingPrice > 0 ? `配送费用: ¥${order.shippingPrice.toFixed(2)}` : '免费配送'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 订单详情模态框 */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeOrderDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* 模态框头部 */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold">订单详情</h2>
                <button
                  onClick={closeOrderDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 模态框内容 */}
              <div className="p-6 space-y-8">
                {/* 订单基本信息 */}
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">订单号: {selectedOrder.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${orderStatusMap[selectedOrder.status]?.color || 'text-gray-600 bg-gray-50'}`}>
                        {orderStatusMap[selectedOrder.status]?.text || selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(selectedOrder.orderDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 收货信息 */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-[#3a0c0c]" />
                    收货信息
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="font-medium">{selectedOrder.address.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedOrder.address.phone}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedOrder.address.province} {selectedOrder.address.city} {selectedOrder.address.district} {selectedOrder.address.address} {selectedOrder.address.zipCode}
                    </p>
                  </div>
                </div>

                {/* 配送信息 */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-[#3a0c0c]" />
                    配送信息
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="font-medium">{shippingMethodNames[selectedOrder.shippingMethod]}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedOrder.shippingPrice > 0 ? `配送费用: ¥${selectedOrder.shippingPrice.toFixed(2)}` : '免费配送'}
                    </p>
                  </div>
                </div>

                {/* 商品列表 */}
                <div>
                  <h4 className="font-semibold mb-4">商品列表</h4>
                  <div className="space-y-4 border rounded-lg overflow-hidden">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
                          <p className="text-sm text-gray-500 mt-1 truncate">{item.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#3a0c0c]">{item.price}</p>
                          <p className="text-sm text-gray-500">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 价格明细 */}
                <div>
                  <h4 className="font-semibold mb-4">价格明细</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">商品总价</span>
                        <span className="text-gray-800 font-medium">¥{(selectedOrder.totalAmount - selectedOrder.shippingPrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">配送费用</span>
                        <span className="text-gray-800 font-medium">
                          {selectedOrder.shippingPrice > 0 ? `¥${selectedOrder.shippingPrice.toFixed(2)}` : '免费'}
                        </span>
                      </div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">订单总额</span>
                        <span className="text-xl font-bold text-[#3a0c0c]">¥{selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 关闭按钮 */}
                <div className="flex justify-center">
                  <button
                    onClick={closeOrderDetail}
                    className="px-8 py-3 bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
