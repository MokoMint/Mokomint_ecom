export type ProductImage = {
  url: string;
  sequence: number;
};

export type ProductData = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  information: string;
  images: ProductImage[];
  price: number;
  oldPrice?: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  amazonUrl: string;
  detailsUrl: string;
  sizes: string[];
  colors: string[];
  reviewCount: number;
  category: string;
  ageRange: string[];
  whatIsInTheBox: string;
  modelNumber?: string;
  isEnabled?: boolean;
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
