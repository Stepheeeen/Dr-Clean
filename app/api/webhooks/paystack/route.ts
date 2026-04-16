import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature || !PAYSTACK_SECRET_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle charge.success
    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;

      // Update order status
      const existingOrder = await prisma.order.findFirst({
        where: { paymentReference: reference }
      });

      if (!existingOrder) {
        console.warn(`Order not found for reference: ${reference}`);
        return NextResponse.json({ status: 'Order not found' });
      }

      const order = await prisma.order.update({
        where: { id: existingOrder.id },
        data: { 
          paymentStatus: 'Paid',
          status: 'Processing'
        },
      });

      console.log(`Payment confirmed for Order ID: ${order.id}`);
      
      revalidatePath('/admin/orders');
      revalidatePath(`/admin/orders/${order.id}`);
      revalidatePath(`/customer/orders/${order.id}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
