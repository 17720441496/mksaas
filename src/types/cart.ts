// 购物车商品项类型
export interface CartItem {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  description: string;
  quantity: number;
}

// 购物车类型
export interface Cart {
  items: CartItem[];
}

// 购物车工具函数
export const cartUtils = {
  // 获取商品价格数值
  getPriceValue(item: CartItem): number {
    return parseFloat(item.price.replace(/[^\d.]/g, ''));
  },
  // 获取商品单项总价
  getItemTotalPrice(item: CartItem): number {
    return cartUtils.getPriceValue(item) * item.quantity;
  },
  // 获取购物车商品总数
  getTotalItems(cart: Cart): number {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
  // 获取购物车总金额
  getTotalPrice(cart: Cart): number {
    return cart.items.reduce((total, item) => total + cartUtils.getItemTotalPrice(item), 0);
  },
  // 判断购物车是否为空
  isEmpty(cart: Cart): boolean {
    return cart.items.length === 0;
  }
};

// 购物车上下文类型
export interface CartContextType {
  cart: Cart & {
    totalItems: number;
    totalPrice: number;
  };
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}
