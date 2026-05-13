"use client";

import { useState } from "react";
import Image from "next/image";
import "../styles/product.css";
import React from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selected, setSelected] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // React.useEffect(() => {
  //   images.forEach((src) => {
  //     if (typeof src === "string" && !src.includes("<script")) {
  //       const img = new window.Image();
  //       img.src = src;
  //     }
  //   });
  // }, [images]);
  // console.log(images);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    setZoomStyle({});
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Main Image with Zoom */}
      <div
        className="Gallery-image position-relative border rounded flex items-center justify-center"
        style={{
          aspectRatio: "1 / 1",
          maxHeight: "450px",
          overflow: "hidden",
          cursor: "zoom-in",
          backgroundColor: "#f5f5f5",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={selected}
          alt="Product"
          width={450}
          height={450}
          // className="object-contain"
          className="object-contain w-auto h-auto max-w-full max-h-full p-4"
          style={{
            ...zoomStyle,
            transition: showZoom ? "none" : "transform 0.2s ease",
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails - Below Main Image, Horizontal */}
      <div style={{ width: "100%" }}>
        <div
          className="d-flex gap-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: "8px",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelected(img)}
              className={`border rounded cursor-pointer p-1 ${
                selected === img ? "border-primary" : "border-secondary"
              }`}
              style={{
                cursor: "pointer",
                width: "clamp(50px, 12vw, 70px)",
                height: "clamp(50px, 12vw, 70px)",
                flexShrink: 0,
              }}
            >
              <div className="position-relative" style={{ height: "100%" }}>
                <Image src={img} alt={`Product ${i + 1}`} fill sizes="70px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
