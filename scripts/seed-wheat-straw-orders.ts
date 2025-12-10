import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { getDb } from '../src/db/index.js';
import { user, wheatStrawOrder, productOption } from '../src/db/schema.js';
import { eq } from 'drizzle-orm';

dotenv.config();

export default async function seedWheatStrawOrders() {
  const db = await getDb();

  try {
    // 获取第一个用户（如果没有用户，会报错）
    const users = await db.select({ id: user.id, email: user.email }).from(user).limit(1);
    
    if (users.length === 0) {
      console.error('Error: No users found in database. Please create a user first.');
      process.exit(1);
    }

    const testUserId = users[0].id;
    console.log(`Using user: ${users[0].email} (${testUserId})`);

    // 获取产品选项（如果存在）
    const sizeOptions = await db
      .select({ id: productOption.id, name: productOption.name })
      .from(productOption)
      .where(eq(productOption.category, 'size'))
      .limit(1);

    const frameOptions = await db
      .select({ id: productOption.id, name: productOption.name })
      .from(productOption)
      .where(eq(productOption.category, 'frame'))
      .limit(1);

    const mountingOptions = await db
      .select({ id: productOption.id, name: productOption.name })
      .from(productOption)
      .where(eq(productOption.category, 'mounting'))
      .limit(1);

    const sizeOptionId = sizeOptions[0]?.id || null;
    const frameOptionId = frameOptions[0]?.id || null;
    const mountingOptionId = mountingOptions[0]?.id || null;

    console.log('Product options:', {
      size: sizeOptionId,
      frame: frameOptionId,
      mounting: mountingOptionId,
    });

    // 生成订单号
    const generateOrderNumber = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `WS${timestamp}${random}`;
    };

    // 插入第一条订单 - 已支付状态
    const order1Id = randomUUID();
    const order1Number = generateOrderNumber();
    const now = new Date();
    const paidAt = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2天前支付

    await db.insert(wheatStrawOrder).values({
      id: order1Id,
      orderNumber: order1Number,
      userId: testUserId,
      status: 'paid',
      generatedImageUrl: 'https://example.com/images/wheat-straw-1.jpg',
      prompt: 'A majestic Chinese dragon flying through clouds',
      sizeOptionId,
      frameOptionId,
      mountingOptionId,
      basePrice: 5000, // $50.00
      totalPrice: 7500, // $75.00 (包含选项加价)
      currency: 'USD',
      recipientName: 'John Smith',
      recipientPhone: '+1-555-0123',
      shippingAddress: '123 Main Street, Apt 4B',
      shippingCity: 'New York',
      shippingProvince: 'NY',
      shippingPostalCode: '10001',
      shippingCountry: 'US',
      customerNote: 'Please handle with care, thank you!',
      createdAt: paidAt,
      paidAt: paidAt,
      updatedAt: paidAt,
    });

    console.log(`✓ Created order 1: ${order1Number} (${order1Id})`);

    // 插入第二条订单 - 制作中状态
    const order2Id = randomUUID();
    const order2Number = generateOrderNumber();
    const paidAt2 = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5天前支付
    const inProductionAt = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3天前开始制作

    await db.insert(wheatStrawOrder).values({
      id: order2Id,
      orderNumber: order2Number,
      userId: testUserId,
      status: 'in_production',
      generatedImageUrl: 'https://example.com/images/wheat-straw-2.jpg',
      prompt: 'Blooming peony flowers with delicate petals',
      sizeOptionId,
      frameOptionId,
      mountingOptionId,
      basePrice: 5000, // $50.00
      totalPrice: 8500, // $85.00 (包含选项加价)
      currency: 'USD',
      recipientName: 'Emily Johnson',
      recipientPhone: '+1-555-0456',
      shippingAddress: '456 Oak Avenue, Suite 200',
      shippingCity: 'Los Angeles',
      shippingProvince: 'CA',
      shippingPostalCode: '90001',
      shippingCountry: 'US',
      customerNote: 'Please ship as soon as possible',
      createdAt: paidAt2,
      paidAt: paidAt2,
      inProductionAt: inProductionAt,
      updatedAt: inProductionAt,
    });

    console.log(`✓ Created order 2: ${order2Number} (${order2Id})`);

    console.log('\n✅ Successfully created 2 wheat straw orders!');
    console.log(`Order 1: ${order1Number} - Status: paid`);
    console.log(`Order 2: ${order2Number} - Status: in_production`);
  } catch (error) {
    console.error('Error seeding wheat straw orders:', error);
    process.exit(1);
  }
}

seedWheatStrawOrders();

