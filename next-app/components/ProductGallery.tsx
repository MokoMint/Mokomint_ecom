"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selected, setSelected] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div className="row">
      {/* Thumbnails - Vertical on left */}
      <div className="col-3">
        <div className="d-flex flex-column gap-2">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelected(img)}
              className={`border rounded cursor-pointer p-1 ${
                selected === img ? "border-primary" : "border-secondary"
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className="position-relative" style={{ height: 80 }}>
                <Image
                  src={img}
                  alt={`Product ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Image with Zoom */}
      <div className="col-9">
        <div
          className="position-relative border rounded"
          style={{ height: 450, overflow: "hidden", cursor: "zoom-in" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={selected}
            alt="Product"
            fill
            className="object-contain"
            style={{
              ...zoomStyle,
              transition: showZoom ? "none" : "transform 0.2s ease",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
