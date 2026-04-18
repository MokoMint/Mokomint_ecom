import Link from "next/link";
import Image from "next/image";

export default function HomeFeatures() {
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-6 col-md-6 pb-1">
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="img/moko_offer1.png" alt="" />
            <div className="offer-text">
              {/* <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3> */}
              {/* <a href="" className="btn btn-primary">Shop Now</a> */}
              <Link
                href="/shop?category=return-gift"
                className="btn btn-primary"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 pb-1">
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="img/moko_offer2.png" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              {/* <a href="" className="btn btn-primary">Shop Now</a> */}
              <Link
                href="/shop?category=return-gift"
                className="btn btn-primary"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title mb-3">SHOP BY AGE</h2>
        </div>
        <div className="row justify-content-center gx-3 gy-3">
          {[
            {
              range: "0-12",
              unit: "MONTHS",
              bg: "#f8c84a",
              color: "#d43535",
              border: "#f06b37",
            },
            {
              range: "1-3",
              unit: "YEARS",
              bg: "#ee4f4f",
              color: "#fbe0e0",
              border: "#fcaeae",
            },
            {
              range: "4-7",
              unit: "YEARS",
              bg: "#d6e152",
              color: "#243f78",
              border: "#c6d54b",
            },
            {
              range: "8-10",
              unit: "YEARS",
              bg: "#2569a5",
              color: "#fff4a4",
              border: "#1f5a8d",
            },
            {
              range: "11-14",
              unit: "YEARS",
              bg: "#fd8f05",
              color: "#ffffff",
              border: "#f17d00",
            },
            {
              range: "14+",
              unit: "YEARS",
              bg: "#f5a2d5",
              color: "#271733",
              border: "#ed7fc5",
            },
          ].map((item) => (
            <div
              key={item.range}
              className="col-xl-2 col-lg-2 col-md-4 col-sm-6 d-flex justify-content-center"
            >
              <Link
                href={`/shop?age=${item.range}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    background: item.bg,
                    border: `4px dashed ${item.border}`,
                    textAlign: "center",
                    padding: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: item.color,
                      lineHeight: 1,
                    }}
                  >
                    {item.range}
                  </span>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#111",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.unit}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
