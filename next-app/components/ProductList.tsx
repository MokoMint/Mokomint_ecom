import ProductCard, { ProductCardProps } from "./ProductCard";

type ProductListProps = {
  products: ProductCardProps[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="row pb-3">
      {products.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}
