export type ProductImage = {
  url: string;
  alt?: string;
  is_primary?: boolean;
};

export type ProductCategory = {
  name: string;
  slug: string;
};

export type ProductVariant = {
  sku: string;
  name?: string;
  options?: Record<string, string>;
  price: number;
  sale_price?: number | null;
  stock_quantity?: number;
  is_active?: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  cover_image_url?: string | null;
  description?: string | null;
  is_active?: boolean;
};

export type ApiProduct = {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  images?: ProductImage[];
  categories?: ProductCategory[];
  brand?: Brand | { id?: string; name: string; slug?: string };
  pricing?: {
    currency?: string;
    min_price?: number;
    max_price?: number;
  };
  rating?: {
    average?: number;
    count?: number;
  };
  stock?: {
    quantity?: number;
    in_stock?: boolean;
  };
  variants?: ProductVariant[];
  is_featured?: boolean;
  trending_score?: number;
  tags?: string[];
};

export type ProductListData = {
  items: ApiProduct[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  sort?: string;
  brand?: string;
};

export type ProductSearchParams = {
  q: string;
  page?: number;
  limit?: number;
};
