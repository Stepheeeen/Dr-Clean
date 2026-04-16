export interface Service {
  id: string;
  name: string;
  description: string;
  dryCleanPrice: number;
  ironingPrice: number;
  category: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceModifier {
  id: string;
  name: string;
  description: string | null;
  price: number;
  type: 'SURCHARGE' | 'DISCOUNT';
  valueType: 'FIXED' | 'PERCENTAGE';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BulkDiscount {
  id: string;
  threshold: number;
  percentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
