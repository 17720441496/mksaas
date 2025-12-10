'use server';

import { getDb } from '@/db';
import { productOption } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export interface ProductOption {
  id: string;
  category: string;
  name: string;
  nameZh: string;
  description: string | null;
  descriptionZh: string | null;
  priceAdjustment: number;
  sortOrder: number;
  enabled: boolean;
}

export interface ProductOptionsByCategory {
  size: ProductOption[];
  frame: ProductOption[];
  mounting: ProductOption[];
}

/**
 * Get all enabled product options grouped by category
 */
export async function getProductOptions(): Promise<ProductOptionsByCategory> {
  try {
    const db = await getDb();
    const options = await db
      .select()
      .from(productOption)
      .where(eq(productOption.enabled, true))
      .orderBy(productOption.sortOrder);

    const result: ProductOptionsByCategory = {
      size: [],
      frame: [],
      mounting: [],
    };

    for (const option of options) {
      if (option.category === 'size') {
        result.size.push(option as ProductOption);
      } else if (option.category === 'frame') {
        result.frame.push(option as ProductOption);
      } else if (option.category === 'mounting') {
        result.mounting.push(option as ProductOption);
      }
    }

    return result;
  } catch (error) {
    console.error('Error fetching product options:', error);
    throw new Error('Failed to fetch product options');
  }
}

/**
 * Get product options by category
 */
export async function getProductOptionsByCategory(
  category: 'size' | 'frame' | 'mounting'
): Promise<ProductOption[]> {
  try {
    const db = await getDb();
    const options = await db
      .select()
      .from(productOption)
      .where(
        and(
          eq(productOption.category, category),
          eq(productOption.enabled, true)
        )
      )
      .orderBy(productOption.sortOrder);

    return options as ProductOption[];
  } catch (error) {
    console.error(`Error fetching ${category} options:`, error);
    throw new Error(`Failed to fetch ${category} options`);
  }
}

/**
 * Get a specific product option by ID
 */
export async function getProductOptionById(id: string): Promise<ProductOption | null> {
  try {
    const db = await getDb();
    const options = await db
      .select()
      .from(productOption)
      .where(eq(productOption.id, id))
      .limit(1);

    return options.length > 0 ? (options[0] as ProductOption) : null;
  } catch (error) {
    console.error('Error fetching product option:', error);
    return null;
  }
}

