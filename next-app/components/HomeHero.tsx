"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  const slides = [
    {
      src: "/img/moko_carousel1.png",
      alt: "Men Fashion",
      title: "Men Fashion",
      description:
        "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
    },
    {
      src: "/img/moko_carousel2.png",
      alt: "Women Fashion",
      title: "Women Fashion",
      description:
        "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
    },
    {
      src: "/img/moko_carousel3.png",
      alt: "Accessories",
      title: "Accessories",
      description:
        "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam",
    },
  ];

  return (
    <div className="container-fluid mb-3">
      <div className="row">
        <div className="col-lg-12 p-0">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade  mb-lg-0"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              {slides.map((_, index) => (
                <li
                  key={index}
                  data-target="#header-carousel"
                  data-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></li>
              ))}
            </ol>

            {/* Slides */}
            <div className="carousel-inner">
              {slides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`carousel-item position-relative ${
                    index === 0 ? "active" : ""
                  }`}
                  style={{
                    aspectRatio: "16 / 9", // ✅ responsive height
                    overflow: "hidden",
                    maxHeight: "430px",
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw" // ✅ critical for mobile
                    style={{
                      objectFit: "cover",
                    }}
                    quality={90}
                  />

                  {/* Optional Caption */}
                  {/* <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 text-center" style={{ maxWidth: 700 }}>
                      <h1 className="text-white mb-3">
                        {slide.title}
                      </h1>
                      <p className="text-white">
                        {slide.description}
                      </p>
                      <Link
                        href="/shop"
                        className="btn btn-outline-light py-2 px-4 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
