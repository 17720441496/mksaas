import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtworksSection from './ArtworksSection';
import { CartProvider } from './CartProvider';

describe('ArtworksSection Component', () => {
  // 模拟localStorage
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders all artwork cards with correct information', () => {
    render(
      <CartProvider>
        <ArtworksSection />
      </CartProvider>
    );

    // 检查主要艺术品名称是否显示
    expect(screen.getByText('龙腾盛世')).toBeInTheDocument();
    expect(screen.getByText('唐代飞天壁画')).toBeInTheDocument();
    expect(screen.getByText('花开富贵')).toBeInTheDocument();
    expect(screen.getByText('清明上河图长卷')).toBeInTheDocument();
    expect(screen.getByText('唐代宫廷花鸟')).toBeInTheDocument();

    // 检查价格是否显示
    expect(screen.getByText('¥8,888')).toBeInTheDocument();
    expect(screen.getByText('¥5,680')).toBeInTheDocument();
  });

  test('renders add to cart buttons for all artworks', () => {
    render(
      <CartProvider>
        <ArtworksSection />
      </CartProvider>
    );

    // 检查加入购物车按钮是否存在
    const addToCartButtons = screen.getAllByText('加入购物车');
    expect(addToCartButtons).toHaveLength(5);
  });

  test('calls addToCart when button is clicked', () => {
    render(
      <CartProvider>
        <ArtworksSection />
      </CartProvider>
    );

    // 点击第一个加入购物车按钮
    const addToCartButtons = screen.getAllByText('加入购物车');
    fireEvent.click(addToCartButtons[0]);

    // 检查localStorage中是否有购物车数据
    const cartData = localStorage.getItem('cart');
    expect(cartData).not.toBeNull();
    
    if (cartData) {
      const cart = JSON.parse(cartData);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].name).toBe('龙腾盛世');
    }
  });
});
