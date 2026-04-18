export type ProductData = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  information: string;
  image: string;
  price: string;
  oldPrice?: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  amazonUrl: string;
  detailsUrl: string;
  sizes: string[];
  colors: string[];
  reviewCount: number;
  category: string;
  ageRange: string;
};

export type DropdownItem = {
  label: string;
  value?: string;
  href?: string;
};

export type DropdownsData = {
  account: DropdownItem[];
  currency: DropdownItem[];
  language: DropdownItem[];
  sortOptions: DropdownItem[];
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
