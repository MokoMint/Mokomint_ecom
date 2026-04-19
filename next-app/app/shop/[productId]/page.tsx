import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailsTabs from "../../../components/ProductDetailsTabs";
import { ProductData } from "../../../types/types";
import productsData from "../../../mockData/products.json";
import ProductGallery from "../../../components/ProductGallery";

const products: ProductData[] = productsData as ProductData[];

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id.toString() }));
}

function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productIdNumber = Number(productId);
  const product = Number.isNaN(productIdNumber)
    ? null
    : getProductById(productIdNumber);

  if (!product) {
    notFound();
  }

  // Format price helper
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  // Get product images sorted by sequence
  const productImages =
    product.images && product.images.length > 0
      ? [...product.images]
          .sort((a, b) => a.sequence - b.sequence)
          .map((img) => img.url)
      : ["/img/placeholder.png"];
  return (
    <div>
      {/* Breadcrumb */}
      <div className="row px-xl-5">
        <div className="col-12 mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white p-3 rounded shadow-sm">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="row px-xl-5">
        {/* Left - Image Gallery */}
        <div className="col-lg-6 mb-6">
          <div className="bg-white shadow-sm p-3 rounded">
            <ProductGallery images={productImages} />
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="col-lg-6">
          <div className="bg-white shadow-sm p-4 mb-4 rounded">
            <h2 className="mb-3 font-weight-bold">{product.title}</h2>

            {/* Rating */}
            <div className="mb-3">
              <span className="text-warning mr-2">★★★★★</span>
              <span className="text-muted">
                ({product.reviewCount} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-center mb-3 gap-3">
              <h3 className="text-primary mb-0 font-weight-bold">
                {formatPrice(product.price)}
              </h3>
              {product.oldPrice ? (
                <h5 className="text-muted mb-0">
                  <del>{formatPrice(product.oldPrice)}</del>
                </h5>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-muted mb-4">{product.description}</p>

            {/* Sizes */}
            <div className="mb-3">
              <strong>Size:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <strong>Color:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-3">
              <span
                className={`badge ${
                  product.stockStatus === "In Stock"
                    ? "bg-success"
                    : product.stockStatus === "Low Stock"
                      ? "bg-warning"
                      : "bg-danger"
                }`}
              >
                {product.stockStatus}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className="btn btn-warning btn-lg text-white flex-fill"
              >
                Add To Cart
              </button>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-lg flex-fill"
              >
                Buy on Amazon
              </a>
            </div>

            {/* Share */}
            <div className="d-flex gap-3 align-items-center">
              <span className="font-weight-bold">Share on:</span>
              <a className="text-secondary" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-secondary" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-secondary" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-secondary" href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="row px-xl-5">
        <div className="col-12">
          <ProductDetailsTabs
            fullDescription={product.fullDescription}
            information={product.information}
            reviewCount={product.reviewCount}
          />
        </div>
      </div>
    </div>
  );
}
