"use client";

import { ProductData, DropdownsData } from "../types/types";
import { useRouter } from "next/navigation";
import dropdownsData from "../mockData/dropdowns.json";

const dropdowns: DropdownsData = dropdownsData as DropdownsData;
const priceFilters = dropdowns.priceFilters;

const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow"];

interface ShopFiltersProps {
  products: ProductData[];
  currentPriceFilter?: string;
}

function countProductsForFilter(products: ProductData[], filterId: string) {
  const filter = priceFilters.find((item) => item.id === filterId);
  if (!filter) return 0;

  return products.filter((product) => {
    if (filter.min !== null && product.price < filter.min) return false;
    if (filter.max !== null && product.price >= filter.max) return false;
    return true;
  }).length;
}

export default function ShopFilters({
  products,
  currentPriceFilter,
}: ShopFiltersProps) {
  const router = useRouter();
  const selectedFilter = currentPriceFilter || "price-all";

  const handlePriceFilterChange = (filterId: string) => {
    const params = new URLSearchParams(window.location.search);

    if (filterId === "price-all") {
      params.delete("price");
    } else {
      params.set("price", filterId);
    }

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="col-lg-3 col-md-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {priceFilters.map((filter) => (
            <div
              key={filter.id}
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                checked={filter.id === selectedFilter}
                onChange={() => handlePriceFilterChange(filter.id)}
                id={filter.id}
              />
              <label className="custom-control-label" htmlFor={filter.id}>
                {filter.label}
              </label>
              <span className="badge border font-weight-normal">
                {countProductsForFilter(products, filter.id)}
              </span>
            </div>
          ))}
        </form>
      </div>

      {/* <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by color</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {colors.map((color) => (
            <div key={color} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" className="custom-control-input" id={color} />
              <label className="custom-control-label" htmlFor={color}>{color}</label>
              <span className="badge border font-weight-normal">150</span>
            </div>
          ))}
        </form>
      </div> */}
    </div>
  );
}
