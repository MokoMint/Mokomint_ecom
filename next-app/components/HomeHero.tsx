import Link from "next/link";

export default function HomeHero() {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
              <li data-target="#header-carousel" data-slide-to="1"></li>
              <li data-target="#header-carousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              {[
                {
                  src: "/img/carousel-1.jpg",
                  alt: "Men Fashion",
                  title: "Men Fashion",
                  description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
                },
                {
                  src: "/img/carousel-2.jpg",
                  alt: "Women Fashion",
                  title: "Women Fashion",
                  description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
                },
                {
                  src: "/img/carousel-3.jpg",
                  alt: "Accessories",
                  title: "Accessories",
                  description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
                },
              ].map((slide, index) => (
                <div
                  key={slide.title}
                  className={`carousel-item position-relative${index === 0 ? " active" : ""}`}
                  style={{ height: 430 }}
                >
                  <img className="position-absolute w-100 h-100" src={slide.src} style={{ objectFit: "cover" }} alt={slide.alt} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{slide.title}</h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{slide.description}</p>
                      <Link href="/shop" className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {[
            {
              src: "/img/offer-1.jpg",
              label: "Spring Collection",
              badge: "Save 20%",
            },
            {
              src: "/img/offer-2.jpg",
              label: "Holiday Sale",
              badge: "20% Off",
            },
          ].map((offer) => (
            <div key={offer.label} className="product-offer mb-30" style={{ height: 200 }}>
              <img className="img-fluid" src={offer.src} alt={offer.label} />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">{offer.badge}</h6>
                <h3 className="text-white mb-3">{offer.label}</h3>
                <Link href="/shop" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
