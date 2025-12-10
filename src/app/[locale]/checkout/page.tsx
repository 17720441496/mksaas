'use client';

import { useState } from 'react';
import { useCart } from '@/components/custom/CartProvider';
import { useLocaleRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';

// 地址表单类型
interface AddressForm {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  address: string;
  zipCode: string;
}

// 配送方式类型
interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

// 配送方式选项
const shippingMethods: ShippingMethod[] = [
  { id: 'standard', name: '标准配送', price: 0, deliveryTime: '3-5个工作日' },
  { id: 'express', name: ' express配送', price: 10, deliveryTime: '1-2个工作日' },
  { id: 'same-day', name: '同城当日达', price: 20, deliveryTime: '当天送达' },
];

export default function CheckoutPage() {
  const { cart } = useCart();
  const localeRouter = useLocaleRouter();
  const [addressForm, setAddressForm] = useState<AddressForm>({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    address: '',
    zipCode: '',
  });
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('standard');
  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  // 表单验证
  const validateForm = () => {
    const newErrors: Partial<AddressForm> = {};
    
    if (!addressForm.name.trim()) newErrors.name = '请输入收货人姓名';
    if (!addressForm.phone.trim()) {
      newErrors.phone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(addressForm.phone)) {
      newErrors.phone = '请输入正确的手机号码';
    }
    if (!addressForm.province.trim()) newErrors.province = '请选择省份';
    if (!addressForm.city.trim()) newErrors.city = '请选择城市';
    if (!addressForm.district.trim()) newErrors.district = '请选择区/县';
    if (!addressForm.address.trim()) newErrors.address = '请输入详细地址';
    if (!addressForm.zipCode.trim()) {
      newErrors.zipCode = '请输入邮政编码';
    } else if (!/^\d{6}$/.test(addressForm.zipCode)) {
      newErrors.zipCode = '请输入正确的邮政编码';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单字段变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name as keyof AddressForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 处理配送方式选择
  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };

  // 处理提交订单
  const handleSubmitOrder = () => {
    if (!validateForm()) return;
    
    // 计算总金额（购物车金额 + 配送费用）
    const selectedShipping = shippingMethods.find(method => method.id === selectedShippingMethod);
    const shippingPrice = selectedShipping ? selectedShipping.price : 0;
    const totalAmount = cart.totalPrice + shippingPrice;
    
    // 创建订单数据
    const orderData = {
      address: addressForm,
      shippingMethod: selectedShippingMethod,
      shippingPrice,
      totalAmount,
      items: cart.items,
    };
    
    // 保存订单信息到localStorage
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    
    // 跳转到支付页面
    localeRouter.push('/checkout/payment');
  };

  // 获取当前选择的配送方式
  const currentShippingMethod = shippingMethods.find(method => method.id === selectedShippingMethod);
  const shippingPrice = currentShippingMethod ? currentShippingMethod.price : 0;
  const totalAmount = cart.totalPrice + shippingPrice;

  // 如果购物车为空，重定向到购物车页面
  if (cart.items.length === 0) {
    localeRouter.push('/cart');
    return null;
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
            <h1 className="text-3xl font-bold">订单结算</h1>
            <p className="text-gray-200 mt-1">请填写收货信息并选择配送方式</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：订单信息 */}
              <div className="lg:col-span-2 space-y-8">
                {/* 收货地址 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#3a0c0c] text-white flex items-center justify-center mr-3">1</span>
                    收货地址
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">收货人姓名</label>
                      <input
                        type="text"
                        name="name"
                        value={addressForm.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="请输入收货人姓名"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                      <input
                        type="tel"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="请输入手机号码"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">省份</label>
                      <select
                        name="province"
                        value={addressForm.province}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">请选择省份</option>
                        <option value="北京市">北京市</option>
                        <option value="上海市">上海市</option>
                        <option value="广东省">广东省</option>
                        <option value="江苏省">江苏省</option>
                        <option value="浙江省">浙江省</option>
                        {/* 可以根据需要添加更多省份 */}
                      </select>
                      {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">城市</label>
                      <select
                        name="city"
                        value={addressForm.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">请选择城市</option>
                        <option value="广州市">广州市</option>
                        <option value="深圳市">深圳市</option>
                        <option value="东莞市">东莞市</option>
                        {/* 可以根据需要添加更多城市 */}
                      </select>
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">区/县</label>
                      <select
                        name="district"
                        value={addressForm.district}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">请选择区/县</option>
                        <option value="天河区">天河区</option>
                        <option value="越秀区">越秀区</option>
                        <option value="海珠区">海珠区</option>
                        {/* 可以根据需要添加更多区/县 */}
                      </select>
                      {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">邮政编码</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={addressForm.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="请输入邮政编码"
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">详细地址</label>
                      <textarea
                        name="address"
                        value={addressForm.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3a0c0c] focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="请输入详细地址（街道、门牌号等）"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </div>

                {/* 配送方式 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#3a0c0c] text-white flex items-center justify-center mr-3">2</span>
                    配送方式
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map(method => (
                      <div
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedShippingMethod === method.id ? 'border-[#3a0c0c] bg-[#f8f5f0] ring-2 ring-[#3a0c0c]/20' : 'border-gray-300 hover:border-gray-400'}`}
                        onClick={() => handleShippingMethodChange(method.id)}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={selectedShippingMethod === method.id}
                          onChange={() => handleShippingMethodChange(method.id)}
                          className="w-4 h-4 text-[#3a0c0c] focus:ring-[#3a0c0c]"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{method.name}</h3>
                            <span className="text-[#3a0c0c] font-semibold">
                              {method.price > 0 ? `¥${method.price.toFixed(2)}` : '免费'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">预计送达时间：{method.deliveryTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 支付方式 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#3a0c0c] text-white flex items-center justify-center mr-3">3</span>
                    支付方式
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 border border-[#3a0c0c] bg-[#f8f5f0] rounded-lg ring-2 ring-[#3a0c0c]/20">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="alipay"
                        checked
                        className="w-4 h-4 text-[#3a0c0c] focus:ring-[#3a0c0c]"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">支付宝</h3>
                        <p className="text-sm text-gray-500 mt-1">扫码支付，安全快捷</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wechat"
                        className="w-4 h-4 text-[#3a0c0c] focus:ring-[#3a0c0c]"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">微信支付</h3>
                        <p className="text-sm text-gray-500 mt-1">微信扫码，方便易用</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        className="w-4 h-4 text-[#3a0c0c] focus:ring-[#3a0c0c]"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">信用卡</h3>
                        <p className="text-sm text-gray-500 mt-1">支持Visa、MasterCard等国际卡</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：订单摘要 */}
              <div className="lg:col-span-1">
                <div className="bg-[#f8f5f0] p-6 rounded-lg sticky top-8">
                  <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
                  
                  {/* 商品列表 */}
                  <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {cart.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-1 truncate">{item.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#3a0c0c]">{item.price}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 价格明细 */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">商品总价</span>
                      <span className="text-gray-800 font-medium">¥{cart.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">配送费用</span>
                      <span className="text-gray-800 font-medium">
                        {shippingPrice > 0 ? `¥${shippingPrice.toFixed(2)}` : '免费'}
                      </span>
                    </div>
                    <div className="h-px bg-gray-300 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">订单总额</span>
                      <span className="text-xl font-bold text-[#3a0c0c]">¥{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* 提交订单按钮 */}
                  <button
                    onClick={handleSubmitOrder}
                    className="w-full bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-4 px-6 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    提交订单
                  </button>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>点击提交订单即表示您同意我们的</p>
                    <p className="text-[#3a0c0c] underline cursor-pointer">《购物条款》</p>和
                    <p className="text-[#3a0c0c] underline cursor-pointer">《隐私政策》</p>
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
