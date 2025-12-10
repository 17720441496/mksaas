"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartProvider";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      {/* 背景遮罩 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* 购物车侧边栏 */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
      >
        {/* 购物车头部 */}
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#3a0c0c]/5 to-[#5a1c1c]/5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#3a0c0c]">我的购物车</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#3a0c0c] transition-all duration-200 hover:bg-gray-100 p-2 rounded-full"
            aria-label="关闭购物车"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 购物车内容 */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-lg font-medium">购物车是空的</h3>
              <p className="text-sm">浏览我们的麦秆画作品，添加喜欢的商品到购物车吧</p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-[#3a0c0c] line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.title}</p>
                      <p className="text-lg font-bold text-[#3a0c0c] mt-2">{item.price}</p>
                    </div>
                    
                    {/* 数量控制 */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                          aria-label="减少数量"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-medium text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="增加数量"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 py-2 px-3 bg-red-50 hover:bg-red-100 rounded-full text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 购物车底部 */}
        {cart.items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white shadow-inner">
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">商品总数：</span>
                <span className="text-gray-800 font-semibold">{cart.totalItems} 件</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-gray-700 font-semibold text-lg">总计：</span>
                <span className="text-[#3a0c0c] font-bold text-2xl">¥{cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-[#3a0c0c] to-[#5a1c1c] text-white py-4 px-6 rounded-lg hover:from-[#4a1616] hover:to-[#6a2626] transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              立即结算
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">点击结算后将跳转到订单确认页面</p>
          </div>
        )}
      </motion.div>
    </>
  );
};
