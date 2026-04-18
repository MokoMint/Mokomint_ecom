import ProductCard, { ProductCardProps } from "./ProductCard";

type ProductListProps = {
  products: ProductCardProps[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="row pb-3">
      {products.map((product) => (
        <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
