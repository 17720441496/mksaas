'use client';

import { getAllWheatStrawOrders } from '@/actions/get-wheat-straw-orders';
import { updateOrderStatus } from '@/actions/update-wheat-straw-order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const statusOptions = [
  { value: 'all', label: { en: 'All Orders', zh: '所有订单' } },
  { value: 'pending', label: { en: 'Pending', zh: '待支付' } },
  { value: 'paid', label: { en: 'Paid', zh: '已支付' } },
  { value: 'in_production', label: { en: 'In Production', zh: '制作中' } },
  { value: 'shipped', label: { en: 'Shipped', zh: '已发货' } },
  { value: 'completed', label: { en: 'Completed', zh: '已完成' } },
  { value: 'cancelled', label: { en: 'Cancelled', zh: '已取消' } },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-blue-500';
    case 'in_production':
      return 'bg-yellow-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function AdminOrdersPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const result = await getAllWheatStrawOrders({ status: statusFilter });
      if (result?.data?.success && result.data.data) {
        setOrders(result.data.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const result = await updateOrderStatus({
        orderId,
        status: newStatus as any,
      });

      if (result?.data?.success) {
        // Reload orders
        await loadOrders();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {locale === 'zh' ? '订单管理' : 'Order Management'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'zh' ? '管理所有麦秆画订单' : 'Manage all wheat straw painting orders'}
            </p>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label[locale as 'en' | 'zh']}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'zh' ? '订单列表' : 'Orders List'}
            </CardTitle>
            <CardDescription>
              {locale === 'zh' 
                ? `共 ${orders.length} 个订单` 
                : `${orders.length} orders total`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {locale === 'zh' ? '没有找到订单' : 'No orders found'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'zh' ? '订单号' : 'Order #'}</TableHead>
                      <TableHead>{locale === 'zh' ? '客户' : 'Customer'}</TableHead>
                      <TableHead>{locale === 'zh' ? '金额' : 'Amount'}</TableHead>
                      <TableHead>{locale === 'zh' ? '状态' : 'Status'}</TableHead>
                      <TableHead>{locale === 'zh' ? '创建时间' : 'Created'}</TableHead>
                      <TableHead>{locale === 'zh' ? '操作' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.userName}</p>
                            <p className="text-xs text-muted-foreground">{order.userEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>${(order.totalPrice / 100).toFixed(2)}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-[150px]">
                              <Badge className={getStatusColor(order.status)}>
                                <SelectValue />
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">
                                {locale === 'zh' ? '已支付' : 'Paid'}
                              </SelectItem>
                              <SelectItem value="in_production">
                                {locale === 'zh' ? '制作中' : 'In Production'}
                              </SelectItem>
                              <SelectItem value="shipped">
                                {locale === 'zh' ? '已发货' : 'Shipped'}
                              </SelectItem>
                              <SelectItem value="completed">
                                {locale === 'zh' ? '已完成' : 'Completed'}
                              </SelectItem>
                              <SelectItem value="cancelled">
                                {locale === 'zh' ? '已取消' : 'Cancelled'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString(locale)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/orders/${order.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

