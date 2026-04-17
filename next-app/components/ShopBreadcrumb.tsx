import Link from "next/link";

type ShopBreadcrumbProps = {
  current: string;
};

export default function ShopBreadcrumb({ current }: ShopBreadcrumbProps) {
  return (
    <div className="row px-xl-5">
      <div className="col-12">
        <nav className="breadcrumb bg-light mb-30">
          <Link href="/" className="breadcrumb-item text-dark">
            Home
          </Link>
          <span className="breadcrumb-item active">{current}</span>
        </nav>
      </div>
    </div>
  );
}
