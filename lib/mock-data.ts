// Mock data for the Dr. Clean Laundry application

export const SERVICES = [
  { id: 1, name: 'Washing', description: 'Professional washing service for all fabric types', price: 2.5 },
  { id: 2, name: 'Ironing & Pressing', description: 'Expert ironing for a crisp, polished look', price: 1.5 },
  { id: 3, name: 'Folding', description: 'Neat folding and organization service', price: 1.0 },
  { id: 4, name: 'Dry Cleaning', description: 'Premium dry cleaning for delicate items', price: 5.0 },
  { id: 5, name: 'Express Service', description: '24-hour turnaround available', price: 3.5 },
  { id: 6, name: 'Pickup & Delivery', description: 'Convenient pickup and delivery service', price: 0 },
]

export const ORDER_STATUSES = [
  'Pending',
  'Pickup Scheduled',
  'Picked Up',
  'Received',
  'In Cleaning',
  'In Ironing/Folding',
  'Ready',
  'Delivered',
  'Completed',
  'Cancelled',
]

export const MOCK_CUSTOMERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (234) 567-8900',
    address: '123 Main St, City, State 12345',
    totalOrders: 24,
    totalSpent: 285.60,
    joinDate: '2023-06-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (234) 567-8901',
    address: '456 Oak Ave, City, State 12346',
    totalOrders: 18,
    totalSpent: 198.75,
    joinDate: '2023-08-22',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 (234) 567-8902',
    address: '789 Pine Ln, City, State 12347',
    totalOrders: 42,
    totalSpent: 542.10,
    joinDate: '2022-11-03',
  },
]

export const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'John Smith',
    status: 'Ready',
    createdAt: '2024-04-01',
    scheduledPickup: '2024-04-01 09:00 AM',
    items: [
      { service: 'Washing', quantity: 5, price: 2.5 },
      { service: 'Ironing & Pressing', quantity: 3, price: 1.5 },
    ],
    total: 19.50,
    notes: 'Handle silk shirts with care',
  },
  {
    id: 'ORD-002',
    customerId: '2',
    customerName: 'Sarah Johnson',
    status: 'In Cleaning',
    createdAt: '2024-04-02',
    scheduledPickup: '2024-04-02 10:30 AM',
    items: [
      { service: 'Dry Cleaning', quantity: 2, price: 5.0 },
      { service: 'Pickup & Delivery', quantity: 1, price: 0 },
    ],
    total: 10.00,
    notes: '',
  },
  {
    id: 'ORD-003',
    customerId: '3',
    customerName: 'Michael Chen',
    status: 'Pickup Scheduled',
    createdAt: '2024-04-03',
    scheduledPickup: '2024-04-03 02:00 PM',
    items: [
      { service: 'Washing', quantity: 8, price: 2.5 },
      { service: 'Folding', quantity: 8, price: 1.0 },
    ],
    total: 24.00,
    notes: 'Business shirts - needs starch',
  },
  {
    id: 'ORD-004',
    customerId: '1',
    customerName: 'John Smith',
    status: 'Completed',
    createdAt: '2024-03-28',
    scheduledPickup: '2024-03-28 09:00 AM',
    items: [
      { service: 'Washing', quantity: 3, price: 2.5 },
      { service: 'Ironing & Pressing', quantity: 2, price: 1.5 },
    ],
    total: 10.50,
    notes: '',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Emma Williams',
    content: 'Outstanding service! My clothes come back perfectly cleaned and pressed every time. Highly recommend!',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Martinez',
    content: 'The pickup and delivery service is so convenient. No more trips to the cleaners!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa Anderson',
    content: 'Professional, reliable, and affordable. Dr. Clean is my go-to laundry service.',
    rating: 5,
  },
]

export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'What is your turnaround time?',
    answer: 'Standard turnaround is 3-5 business days. We also offer express 24-hour service for an additional fee.',
  },
  {
    id: 2,
    question: 'Do you offer pickup and delivery?',
    answer: 'Yes! We provide convenient pickup and delivery services at no extra charge for orders over $20.',
  },
  {
    id: 3,
    question: 'How much does dry cleaning cost?',
    answer: 'Dry cleaning prices vary by item type, but typically range from $4-$8 per piece. Check our pricing page for details.',
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets. You can also pay on delivery.',
  },
  {
    id: 5,
    question: 'How do I track my order?',
    answer: 'Log into your account to see real-time updates on your order status, from pickup to delivery.',
  },
  {
    id: 6,
    question: 'What if there\'s an issue with my order?',
    answer: 'Our customer service team is available to help. Contact us immediately and we\'ll make it right.',
  },
]

export const ANALYTICS_DATA = {
  totalOrders: 1243,
  activeOrders: 47,
  completedOrders: 1186,
  totalRevenue: 15430.75,
  averageOrderValue: 12.41,
  ordersThisMonth: 287,
  ordersLastMonth: 256,
  revenueThisMonth: 3562.50,
  revenueLastMonth: 3175.80,
  ordersChart: [
    { date: 'Apr 1', orders: 12, revenue: 148.50 },
    { date: 'Apr 2', orders: 15, revenue: 186.30 },
    { date: 'Apr 3', orders: 18, revenue: 223.50 },
    { date: 'Apr 4', orders: 14, revenue: 174.20 },
    { date: 'Apr 5', orders: 22, revenue: 273.40 },
    { date: 'Apr 6', orders: 19, revenue: 236.10 },
    { date: 'Apr 7', orders: 25, revenue: 310.25 },
  ],
}

export const WEBSITE_CONTENT = {
  hero: {
    headline: 'Premium Laundry Care Delivered',
    subheadline: 'Professional cleaning with convenient pickup and delivery service',
  },
  about: {
    headline: 'About Dr. Clean',
    description: 'With over 10 years of experience in professional laundry care, Dr. Clean has become the trusted choice for busy professionals and families. We combine traditional cleaning expertise with modern convenience.',
  },
}
