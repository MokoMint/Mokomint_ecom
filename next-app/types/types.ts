export type ProductData = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  oldPrice?: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  amazonUrl: string;
  detailsUrl: string;
};
