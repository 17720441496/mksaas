import { boolean, integer, pgTable, text, timestamp, index, decimal } from "drizzle-orm/pg-core";

// 商品分类表
export const category = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  categoryNameIdx: index("category_name_idx").on(table.name),
}));

// 商品表
export const product = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  categoryId: text("category_id").references(() => category.id, { onDelete: "set null" }),
  stock: integer("stock").notNull().default(0),
  sold: integer("sold").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  isNew: boolean("is_new").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  productNameIdx: index("product_name_idx").on(table.name),
  productCategoryIdIdx: index("product_category_id_idx").on(table.categoryId),
  productIsActiveIdx: index("product_is_active_idx").on(table.isActive),
  productIsFeaturedIdx: index("product_is_featured_idx").on(table.isFeatured),
}));

// 商品图片表
export const productImage = pgTable("product_image", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => product.id, { onDelete: "cascade" }).notNull(),
  imageUrl: text("image_url").notNull(),
  isMain: boolean("is_main").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  productImageProductIdIdx: index("product_image_product_id_idx").on(table.productId),
}));

// 订单表
export const order = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, paid, shipped, delivered, canceled
  shippingAddress: text("shipping_address").notNull(),
  contactPhone: text("contact_phone").notNull(),
  paymentMethod: text("payment_method").notNull(),
  orderNumber: text("order_number").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  orderUserIdIdx: index("order_user_id_idx").on(table.userId),
  orderStatusIdx: index("order_status_idx").on(table.status),
  orderOrderNumberIdx: index("order_order_number_idx").on(table.orderNumber),
}));

// 订单项表
export const orderItem = pgTable("order_item", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => order.id, { onDelete: "cascade" }).notNull(),
  productId: text("product_id").references(() => product.id, { onDelete: "set null" }).notNull(),
  productName: text("product_name").notNull(),
  productImage: text("product_image").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  orderItemOrderIdIdx: index("order_item_order_id_idx").on(table.orderId),
  orderItemProductIdIdx: index("order_item_product_id_idx").on(table.productId),
}));

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires'),
	customerId: text('customer_id'),
}, (table) => ({
	userIdIdx: index("user_id_idx").on(table.id),
	userCustomerIdIdx: index("user_customer_id_idx").on(table.customerId),
	userRoleIdx: index("user_role_idx").on(table.role),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by')
}, (table) => ({
	sessionTokenIdx: index("session_token_idx").on(table.token),
	sessionUserIdIdx: index("session_user_id_idx").on(table.userId),
}));

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
}, (table) => ({
	accountUserIdIdx: index("account_user_id_idx").on(table.userId),
	accountAccountIdIdx: index("account_account_id_idx").on(table.accountId),
	accountProviderIdIdx: index("account_provider_id_idx").on(table.providerId),
}));

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const payment = pgTable("payment", {
	id: text("id").primaryKey(),
	priceId: text('price_id').notNull(),
	type: text('type').notNull(),
	scene: text('scene'), // payment scene: 'lifetime', 'credit', 'subscription'
	interval: text('interval'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	customerId: text('customer_id').notNull(),
	subscriptionId: text('subscription_id'),
	sessionId: text('session_id'),
	invoiceId: text('invoice_id').unique(), // unique constraint for avoiding duplicate processing
	status: text('status').notNull(),
	paid: boolean('paid').notNull().default(false), // indicates whether payment is completed (set in invoice.paid event)
	periodStart: timestamp('period_start'),
	periodEnd: timestamp('period_end'),
	cancelAtPeriodEnd: boolean('cancel_at_period_end'),
	trialStart: timestamp('trial_start'),
	trialEnd: timestamp('trial_end'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
	paymentTypeIdx: index("payment_type_idx").on(table.type),
	paymentSceneIdx: index("payment_scene_idx").on(table.scene),
	paymentPriceIdIdx: index("payment_price_id_idx").on(table.priceId),
	paymentUserIdIdx: index("payment_user_id_idx").on(table.userId),
	paymentCustomerIdIdx: index("payment_customer_id_idx").on(table.customerId),
	paymentStatusIdx: index("payment_status_idx").on(table.status),
	paymentPaidIdx: index("payment_paid_idx").on(table.paid),
	paymentSubscriptionIdIdx: index("payment_subscription_id_idx").on(table.subscriptionId),
	paymentSessionIdIdx: index("payment_session_id_idx").on(table.sessionId),
	paymentInvoiceIdIdx: index("payment_invoice_id_idx").on(table.invoiceId),
}));

export const userCredit = pgTable("user_credit", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	currentCredits: integer("current_credits").notNull().default(0),
	lastRefreshAt: timestamp("last_refresh_at"), // deprecated
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	userCreditUserIdIdx: index("user_credit_user_id_idx").on(table.userId),
}));

export const creditTransaction = pgTable("credit_transaction", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	type: text("type").notNull(),
	description: text("description"),
	amount: integer("amount").notNull(),
	remainingAmount: integer("remaining_amount"),
	paymentId: text("payment_id"), // field name is paymentId, but actually it's invoiceId
	expirationDate: timestamp("expiration_date"),
	expirationDateProcessedAt: timestamp("expiration_date_processed_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	creditTransactionUserIdIdx: index("credit_transaction_user_id_idx").on(table.userId),
	creditTransactionTypeIdx: index("credit_transaction_type_idx").on(table.type),
}));
