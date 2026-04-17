const categories = [
  { src: "/img/cat-1.jpg", label: "Women's Dress" },
  { src: "/img/cat-2.jpg", label: "Men's Shirt" },
  { src: "/img/cat-3.jpg", label: "Jeans" },
  { src: "/img/cat-4.jpg", label: "Shoes" },
];

export default function HomeCategories() {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {categories.map((item) => (
          <div key={item.label} className="col-lg-3 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{ padding: 30 }}>
              <p className="text-right">15 Products</p>
              <a href="#" className="cat-img position-relative overflow-hidden mb-3">
                <img className="img-fluid" src={item.src} alt={item.label} />
              </a>
              <h5 className="font-weight-semi-bold m-0">{item.label}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
