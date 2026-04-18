import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailsTabs from "../../../components/ProductDetailsTabs";
import { ProductData } from "../../../types/types";
import productsData from "../../../mockData/products.json";

const products: ProductData[] = productsData as ProductData[];

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id.toString() }));
}

function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const productIdNumber = Number(productId);
  const product = Number.isNaN(productIdNumber) ? null : getProductById(productIdNumber);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col-12 mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white p-3 rounded">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/shop">Shop</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row px-xl-5">
        <div className="col-lg-6 mb-4">
          <div className="bg-white shadow-sm p-3">
            <div className="position-relative" style={{ minHeight: 520 }}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-white shadow-sm p-4 mb-4">
            <h2 className="mb-3">{product.title}</h2>
            <div className="mb-3">
              <span className="text-warning mr-2">★★★★★</span>
              <span className="text-muted">({product.reviewCount} Reviews)</span>
            </div>
            <div className="d-flex align-items-center mb-3 gap-3">
              <h3 className="text-primary mb-0">{product.price}</h3>
              {product.oldPrice ? (
                <h5 className="text-muted mb-0"><del>{product.oldPrice}</del></h5>
              ) : null}
            </div>
            <p className="text-muted mb-4">{product.description}</p>

            <div className="mb-3">
              <strong>Sizes:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button key={size} type="button" className="btn btn-outline-secondary btn-sm">{size}</button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <strong>Colors:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {product.colors.map((color) => (
                  <button key={color} type="button" className="btn btn-outline-secondary btn-sm">{color}</button>
                ))}
              </div>
            </div>

            <div className="d-flex gap-2 mb-3">
              <button type="button" className="btn btn-warning btn-lg text-white flex-fill">Add To Cart</button>
              <a href={product.amazonUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-lg flex-fill">Buy on Amazon</a>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <span className="font-weight-bold">Share on:</span>
              <a className="text-secondary" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="text-secondary" href="#"><i className="fab fa-twitter"></i></a>
              <a className="text-secondary" href="#"><i className="fab fa-linkedin-in"></i></a>
              <a className="text-secondary" href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>

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
