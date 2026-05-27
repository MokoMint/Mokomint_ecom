"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductData } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

export type ProductCardProps = ProductData;

function stockBadgeClass(status: string) {
  if (status === "In Stock") return "bg-success text-white";
  if (status === "Low Stock") return "bg-warning text-dark";
  return "bg-danger text-white";
}

function formatPrice(price: number): string {
  return `₹${price.toFixed(2)}`;
}

export default function ProductCard({
  id,
  title,
  description,
  images,
  price,
  oldPrice,
  stockStatus,
  amazonUrl,
  detailsUrl,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const buyDisabled = stockStatus === "Out of Stock";
  const detailHref = `/shop/${id}`;

  // Get the first image (sequence 1) or use placeholder
  const mainImage =
    images && images.length > 0
      ? images.find((img) => img.sequence === 1)?.url || images[0].url
      : "/img/placeholder.png";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        description,
        images,
        price,
        oldPrice,
        stockStatus,
        amazonUrl,
        detailsUrl,
        fullDescription: "",
        information: "",
        sizes: [],
        colors: [],
        reviewCount: 0,
        category: "",
        ageRange: [],
        modelNumber: "",
        whatIsInTheBox: "",
      }),
    );
    toast.success("Product added to cart!");
  };

  return (
    <div className="product-item bg-light mb-4 shadow-sm">
      <Link href={detailHref} className="text-decoration-none">
        <div
          className="product-img position-relative overflow-hidden"
          style={{ height: 280 }}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="text-center py-4 px-3">
        <Link
          href={detailHref}
          className="h6 mb-3 text-muted"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.5em",
          }}
        >
          {title}
        </Link>
        {/* <p
          className="text-muted small mb-3"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.5em",
          }}
        >
          {description}
        </p> */}
        <div className="d-flex align-items-center justify-content-center mb-3 gap-2">
          <h5 className="text-primary mb-0">
            {formatPrice(price)}&nbsp;&nbsp;
          </h5>
          {oldPrice ? (
            <h6 className="text-muted mb-0">
              <del>{formatPrice(oldPrice)}</del>
            </h6>
          ) : null}
        </div>
        <span className={`badge ${stockBadgeClass(stockStatus)} mb-3`}>
          {stockStatus}
        </span>
        <div className="d-flex flex-column gap-2">
          <button
            onClick={handleAddToCart}
            disabled={buyDisabled}
            className={`btn btn-success w-100 text-white fw-bold ${buyDisabled ? "disabled" : ""}`}
            style={{ boxShadow: "0 10px 25px rgba(40, 167, 69, 0.25)" }}
          >
            {buyDisabled ? "Out of Stock" : "Add to Cart"}
          </button>
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
          {/* <Link
            href={detailHref}
            className="btn btn-outline-primary w-100 fw-semibold"
          >
            More Details
          </Link> */}
        </div>
      </div>
    </div>
  );
}
