'use server';

import { getDb } from '@/db';
import { wheatStrawOrder } from '@/db/schema';
import { adminActionClient } from '@/lib/safe-action';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const updateOrderStatusSchema = z.object({
  orderId: z.string(),
  status: z.enum(['pending', 'paid', 'in_production', 'shipped', 'completed', 'cancelled']),
});

/**
 * Update wheat straw order status (admin only)
 */
export const updateOrderStatus = adminActionClient
  .schema(updateOrderStatusSchema)
  .action(async ({ parsedInput }) => {
    const { orderId, status } = parsedInput;

    try {
      const db = await getDb();
      
      const updateData: any = {
        status,
        updatedAt: new Date(),
      };

      // Set timestamp fields based on status
      const now = new Date();
      switch (status) {
        case 'paid':
          updateData.paidAt = now;
          break;
        case 'in_production':
          updateData.inProductionAt = now;
          break;
        case 'shipped':
          updateData.shippedAt = now;
          break;
        case 'completed':
          updateData.completedAt = now;
          break;
        case 'cancelled':
          updateData.cancelledAt = now;
          break;
      }

      await db
        .update(wheatStrawOrder)
        .set(updateData)
        .where(eq(wheatStrawOrder.id, orderId));

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        error: 'Failed to update order status',
      };
    }
  });

const updateShippingInfoSchema = z.object({
  orderId: z.string(),
  shippingCompany: z.string().min(1),
  trackingNumber: z.string().min(1),
});

/**
 * Update shipping information (admin only)
 */
export const updateShippingInfo = adminActionClient
  .schema(updateShippingInfoSchema)
  .action(async ({ parsedInput }) => {
    const { orderId, shippingCompany, trackingNumber } = parsedInput;

    try {
      const db = await getDb();
      
      await db
        .update(wheatStrawOrder)
        .set({
          shippingCompany,
          trackingNumber,
          updatedAt: new Date(),
        })
        .where(eq(wheatStrawOrder.id, orderId));

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error updating shipping info:', error);
      return {
        success: false,
        error: 'Failed to update shipping information',
      };
    }
  });

const updateAdminNoteSchema = z.object({
  orderId: z.string(),
  adminNote: z.string(),
});

/**
 * Update admin note (admin only)
 */
export const updateAdminNote = adminActionClient
  .schema(updateAdminNoteSchema)
  .action(async ({ parsedInput }) => {
    const { orderId, adminNote } = parsedInput;

    try {
      const db = await getDb();
      
      await db
        .update(wheatStrawOrder)
        .set({
          adminNote,
          updatedAt: new Date(),
        })
        .where(eq(wheatStrawOrder.id, orderId));

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error updating admin note:', error);
      return {
        success: false,
        error: 'Failed to update admin note',
      };
    }
  });

