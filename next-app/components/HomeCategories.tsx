"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductData } from "../types/types";
import bestSellersData from "../mockData/bestSellers.json";

const bestSellers: ProductData[] = bestSellersData as ProductData[];
const ITEMS_PER_SLIDE = 4;

export default function HomeCategories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(bestSellers.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentSlide * ITEMS_PER_SLIDE;
  const visibleProducts = bestSellers.slice(startIndex, startIndex + ITEMS_PER_SLIDE);

  return (
    <div className="container-fluid pt-5">
       <div className="text-center mb-4">
                <h2 className="section-title mb-3">Best Sellers</h2>
            </div>

      {totalSlides > 1 && (
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      )}

      <div className="row px-xl-5 pb-3 justify-content-center">
        {visibleProducts.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${index === currentSlide ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setCurrentSlide(index)}
              style={{ width: '12px', height: '12px', borderRadius: '50%', padding: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
