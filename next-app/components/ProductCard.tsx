import Link from "next/link";

export type ProductCardProps = {
  title: string;
  image: string;
  price: string;
  oldPrice?: string;
  href?: string;
};

export default function ProductCard({
  title,
  image,
  price,
  oldPrice,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src={image} alt={title} />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href="#">
              <i className="far fa-heart"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="#">
              <i className="fa fa-shopping-cart"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="#">
              <i className="fa fa-sync-alt"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <div className="text-center py-4">
          <Link href={href} className="h6 text-decoration-none text-truncate">
            {title}
          </Link>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>{price}</h5>
            {oldPrice ? (
              <h6 className="text-muted ml-2">
                <del>{oldPrice}</del>
              </h6>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
