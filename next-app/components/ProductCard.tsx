import Link from "next/link";
import Image from "next/image";
import { ProductData } from "../types/types";

export type ProductCardProps = ProductData;

function stockBadgeClass(status: string) {
  if (status === "In Stock") return "bg-success text-white";
  if (status === "Low Stock") return "bg-warning text-dark";
  return "bg-danger text-white";
}

export default function ProductCard({
  title,
  description,
  image,
  price,
  oldPrice,
  stockStatus,
  amazonUrl,
  detailsUrl,
}: ProductCardProps) {
  const buyDisabled = stockStatus === "Out of Stock";

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 pb-4">
      <div className="product-item bg-light mb-4 shadow-sm">
        <div className="product-img position-relative overflow-hidden" style={{ height: 280 }}>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-center py-4 px-3">
          <Link href={detailsUrl} className="h6 text-decoration-none text-dark d-block mb-2 text-truncate">
            {title}
          </Link>
          <p className="text-muted small mb-3">{description}</p>
          <div className="d-flex align-items-center justify-content-center mb-3 gap-2">
            <h5 className="text-primary mb-0">{price}</h5>
            {oldPrice ? (
              <h6 className="text-muted mb-0">
                <del>{oldPrice}</del>
              </h6>
            ) : null}
          </div>
          <span className={`badge ${stockBadgeClass(stockStatus)} mb-3`}>
            {stockStatus}
          </span>
          <div className="d-flex flex-column gap-2">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noreferrer"
              className={`btn btn-warning w-100 text-white fw-bold ${buyDisabled ? "disabled" : ""}`}
              style={{ boxShadow: "0 10px 25px rgba(255, 193, 7, 0.25)" }}
              aria-disabled={buyDisabled}
            >
              {buyDisabled ? "Unavailable on Amazon" : "Buy on Amazon"}
            </a>
            <Link href={detailsUrl} className="btn btn-outline-primary w-100 fw-semibold">
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
