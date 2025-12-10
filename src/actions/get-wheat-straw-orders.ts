'use server';

import { getDb } from '@/db';
import { wheatStrawOrder, user, productOption } from '@/db/schema';
import type { User } from '@/lib/auth-types';
import { userActionClient, adminActionClient } from '@/lib/safe-action';
import { eq, desc, and } from 'drizzle-orm';
import { z } from 'zod';

export interface WheatStrawOrderWithDetails {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  originalImageUrl: string | null;
  generatedImageUrl: string;
  prompt: string | null;
  basePrice: number;
  totalPrice: number;
  currency: string;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string | null;
  shippingCountry: string;
  shippingCompany: string | null;
  trackingNumber: string | null;
  customerNote: string | null;
  adminNote: string | null;
  createdAt: Date;
  paidAt: Date | null;
  inProductionAt: Date | null;
  shippedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  sizeOption: {
    id: string;
    name: string;
    nameZh: string;
  } | null;
  frameOption: {
    id: string;
    name: string;
    nameZh: string;
  } | null;
  mountingOption: {
    id: string;
    name: string;
    nameZh: string;
  } | null;
}

/**
 * Get wheat straw orders for the current user
 */
export const getUserWheatStrawOrders = userActionClient.action(async ({ ctx }) => {
  const currentUser = (ctx as { user: User }).user;

  try {
    const db = await getDb();
    const orders = await db
      .select()
      .from(wheatStrawOrder)
      .where(eq(wheatStrawOrder.userId, currentUser.id))
      .orderBy(desc(wheatStrawOrder.createdAt));

    // Fetch product options for each order
    const ordersWithDetails: WheatStrawOrderWithDetails[] = [];
    
    for (const order of orders) {
      const sizeOpt = order.sizeOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.sizeOptionId)).limit(1)
        : [];
      const frameOpt = order.frameOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.frameOptionId)).limit(1)
        : [];
      const mountingOpt = order.mountingOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.mountingOptionId)).limit(1)
        : [];

      ordersWithDetails.push({
        ...order,
        createdAt: new Date(order.createdAt),
        paidAt: order.paidAt ? new Date(order.paidAt) : null,
        inProductionAt: order.inProductionAt ? new Date(order.inProductionAt) : null,
        shippedAt: order.shippedAt ? new Date(order.shippedAt) : null,
        completedAt: order.completedAt ? new Date(order.completedAt) : null,
        cancelledAt: order.cancelledAt ? new Date(order.cancelledAt) : null,
        sizeOption: sizeOpt[0] ? {
          id: sizeOpt[0].id,
          name: sizeOpt[0].name,
          nameZh: sizeOpt[0].nameZh,
        } : null,
        frameOption: frameOpt[0] ? {
          id: frameOpt[0].id,
          name: frameOpt[0].name,
          nameZh: frameOpt[0].nameZh,
        } : null,
        mountingOption: mountingOpt[0] ? {
          id: mountingOpt[0].id,
          name: mountingOpt[0].name,
          nameZh: mountingOpt[0].nameZh,
        } : null,
      });
    }

    return {
      success: true,
      data: ordersWithDetails,
    };
  } catch (error) {
    console.error('Error fetching wheat straw orders:', error);
    return {
      success: false,
      error: 'Failed to fetch orders',
    };
  }
});

const orderIdSchema = z.object({
  orderId: z.string(),
});

/**
 * Get a specific wheat straw order details
 */
export const getWheatStrawOrderDetail = userActionClient
  .schema(orderIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    const currentUser = (ctx as { user: User }).user;
    const { orderId } = parsedInput;

    try {
      const db = await getDb();
      const orders = await db
        .select()
        .from(wheatStrawOrder)
        .where(
          and(
            eq(wheatStrawOrder.id, orderId),
            eq(wheatStrawOrder.userId, currentUser.id)
          )
        )
        .limit(1);

      if (orders.length === 0) {
        return {
          success: false,
          error: 'Order not found',
        };
      }

      const order = orders[0];

      // Fetch product options
      const sizeOpt = order.sizeOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.sizeOptionId)).limit(1)
        : [];
      const frameOpt = order.frameOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.frameOptionId)).limit(1)
        : [];
      const mountingOpt = order.mountingOptionId
        ? await db.select().from(productOption).where(eq(productOption.id, order.mountingOptionId)).limit(1)
        : [];

      const orderWithDetails: WheatStrawOrderWithDetails = {
        ...order,
        createdAt: new Date(order.createdAt),
        paidAt: order.paidAt ? new Date(order.paidAt) : null,
        inProductionAt: order.inProductionAt ? new Date(order.inProductionAt) : null,
        shippedAt: order.shippedAt ? new Date(order.shippedAt) : null,
        completedAt: order.completedAt ? new Date(order.completedAt) : null,
        cancelledAt: order.cancelledAt ? new Date(order.cancelledAt) : null,
        sizeOption: sizeOpt[0] ? {
          id: sizeOpt[0].id,
          name: sizeOpt[0].name,
          nameZh: sizeOpt[0].nameZh,
        } : null,
        frameOption: frameOpt[0] ? {
          id: frameOpt[0].id,
          name: frameOpt[0].name,
          nameZh: frameOpt[0].nameZh,
        } : null,
        mountingOption: mountingOpt[0] ? {
          id: mountingOpt[0].id,
          name: mountingOpt[0].name,
          nameZh: mountingOpt[0].nameZh,
        } : null,
      };

      return {
        success: true,
        data: orderWithDetails,
      };
    } catch (error) {
      console.error('Error fetching wheat straw order detail:', error);
      return {
        success: false,
        error: 'Failed to fetch order details',
      };
    }
  });

/**
 * Get all wheat straw orders (admin only)
 */
const adminOrdersSchema = z.object({
  status: z.string().optional(),
});

export const getAllWheatStrawOrders = adminActionClient
  .schema(adminOrdersSchema)
  .action(async ({ parsedInput }) => {
    const { status } = parsedInput;

    try {
      const db = await getDb();
      
      let query = db
        .select({
          order: wheatStrawOrder,
          userName: user.name,
          userEmail: user.email,
        })
        .from(wheatStrawOrder)
        .leftJoin(user, eq(wheatStrawOrder.userId, user.id));

      if (status && status !== 'all') {
        query = query.where(eq(wheatStrawOrder.status, status)) as typeof query;
      }

      const results = await query.orderBy(desc(wheatStrawOrder.createdAt));

      const ordersWithDetails = await Promise.all(
        results.map(async ({ order, userName, userEmail }) => {
          const sizeOpt = order.sizeOptionId
            ? await db.select().from(productOption).where(eq(productOption.id, order.sizeOptionId)).limit(1)
            : [];
          const frameOpt = order.frameOptionId
            ? await db.select().from(productOption).where(eq(productOption.id, order.frameOptionId)).limit(1)
            : [];
          const mountingOpt = order.mountingOptionId
            ? await db.select().from(productOption).where(eq(productOption.id, order.mountingOptionId)).limit(1)
            : [];

          return {
            ...order,
            userName,
            userEmail,
            createdAt: new Date(order.createdAt),
            paidAt: order.paidAt ? new Date(order.paidAt) : null,
            inProductionAt: order.inProductionAt ? new Date(order.inProductionAt) : null,
            shippedAt: order.shippedAt ? new Date(order.shippedAt) : null,
            completedAt: order.completedAt ? new Date(order.completedAt) : null,
            cancelledAt: order.cancelledAt ? new Date(order.cancelledAt) : null,
            sizeOption: sizeOpt[0] ? {
              id: sizeOpt[0].id,
              name: sizeOpt[0].name,
              nameZh: sizeOpt[0].nameZh,
            } : null,
            frameOption: frameOpt[0] ? {
              id: frameOpt[0].id,
              name: frameOpt[0].name,
              nameZh: frameOpt[0].nameZh,
            } : null,
            mountingOption: mountingOpt[0] ? {
              id: mountingOpt[0].id,
              name: mountingOpt[0].name,
              nameZh: mountingOpt[0].nameZh,
            } : null,
          };
        })
      );

      return {
        success: true,
        data: ordersWithDetails,
      };
    } catch (error) {
      console.error('Error fetching all wheat straw orders:', error);
      return {
        success: false,
        error: 'Failed to fetch orders',
      };
    }
  });

