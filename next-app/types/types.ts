export type ProductImage = {
  url: string;
  sequence: number;
};

export type ProductData = {
  id: string;
  isEnabled?: boolean;
  modelNumber?: string;
  title: string;
  fullDescription: string;
  information: string;
  images: ProductImage[];
  price: number;
  oldPrice?: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  amazonUrl?: string; // if this is blank then it will be treated as not available on amazon
  detailsUrl: string;
  sizes: string[];
  colors: string[];
  ageRange: string[];
  category: string[];
  whatIsInTheBox: string;
  isBestSeller?: boolean;
  reviewCount: number;
  description: string;
};

export type DropdownItem = {
  label: string;
  value?: string;
  href?: string;
};

export type PriceFilter = {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
};

export type DropdownsData = {
  account: DropdownItem[];
  currency: DropdownItem[];
  language: DropdownItem[];
  sortOptions: DropdownItem[];
  priceFilters: PriceFilter[];
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type CategoryItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: {
    label: string;
    href: string;
  }[];
};
