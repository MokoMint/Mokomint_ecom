import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailsTabs from "../../../components/ProductDetailsTabs";
import { ProductData } from "../../../types/types";
import productsData from "../../../mockData/products.json";
import ProductGallery from "../../../components/ProductGallery";

const products: ProductData[] = productsData as ProductData[];

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }));
}

function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  // Format price helper
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  function stockBadgeClass(status: string) {
    if (status === "In Stock") return "bg-success text-white";
    if (status === "Low Stock") return "bg-warning text-dark";
    return "bg-danger text-white";
  }
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
            {/* <div className="mb-3">
              <span className="text-warning mr-2">★★★★★</span>
              <span className="text-muted">
                ({product.reviewCount} Reviews)
              </span>
            </div> */}

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

            {/* Stock Status */}
            <div className="mb-3">
              {/* <span
                className={`badge ${
                  product.stockStatus === "In Stock"
                    ? "bg-success"
                    : product.stockStatus === "Low Stock"
                      ? "bg-warning"
                      : "bg-danger"
                }`}
              >
                {product.stockStatus}
              </span> */}
              <span
                className={`badge ${stockBadgeClass(product.stockStatus)} mb-3`}
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
