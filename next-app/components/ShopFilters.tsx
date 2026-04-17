const priceFilters = [
  { id: "price-all", label: "All Price", count: 1000 },
  { id: "price-1", label: "Below $100", count: 150 },
  { id: "price-2", label: "$100 - $200", count: 295 },
  { id: "price-3", label: "$200 - $300", count: 246 },
  { id: "price-4", label: "$300 - $400", count: 145 },
  { id: "price-5", label: "Above $400", count: 168 },
];

const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow"];

export default function ShopFilters() {
  return (
    <div className="col-lg-3 col-md-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {priceFilters.map((filter) => (
            <div key={filter.id} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input type="checkbox" className="custom-control-input" defaultChecked={filter.id === "price-all"} id={filter.id} />
              <label className="custom-control-label" htmlFor={filter.id}>{filter.label}</label>
              <span className="badge border font-weight-normal">{filter.count}</span>
            </div>
          ))}
        </form>
      </div>

      <h5 className="section-title position-relative text-uppercase mb-3">
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
      </div>
    </div>
  );
}
