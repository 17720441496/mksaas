'use client';
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartContextType, cartUtils } from '@/types/cart';

// 定义购物车操作类型
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

// 购物车初始状态
const initialCart: Cart = {
  items: [],
};

// 购物车reducer函数
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // 如果商品已存在，增加数量
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      } else {
        // 如果商品不存在，添加新商品
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        // 如果数量为0或负数，移除商品
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.itemId),
        };
      }
      
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    
    case 'LOAD_CART': {
      return action.payload;
    }
    
    default:
      return state;
  }
};

// 创建购物车上下文
const CartContext = createContext<CartContextType | undefined>(undefined);

// 购物车提供者组件
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCart);
  
  // 计算购物车统计信息
  const totalItems = cartUtils.getTotalItems(cartState);
  const totalPrice = cartUtils.getTotalPrice(cartState);
  
  // 创建包含统计信息的cart对象
  const cart = {
    ...cartState,
    totalItems,
    totalPrice
  };
  
  // 从localStorage加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);
  
  // 将购物车数据保存到localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);
  
  // 添加到购物车
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  
  // 从购物车移除
  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };
  
  // 更新商品数量
  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };
  
  // 清空购物车
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 购物车上下文钩子
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
