"use client";

import { useState } from "react";

type TabKey = "description" | "information" | "reviews";

type ProductDetailsTabsProps = {
  fullDescription: string;
  information: string;
  reviewCount: number;
};

export default function ProductDetailsTabs({
  fullDescription,
  information,
  reviewCount,
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <>
      <div className="mb-4">
        <div className="nav nav-tabs border-0" role="tablist">
          <button
            type="button"
            className={`nav-item nav-link ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={`nav-item nav-link ${activeTab === "information" ? "active" : ""}`}
            onClick={() => setActiveTab("information")}
          >
            Information
          </button>
        </div>
      </div>
      <div className="bg-white p-4 border">
        {activeTab === "description" && (
          <div>
            <h4>Product Description</h4>
            <p
              className="text-muted"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            ></p>
          </div>
        )}
        {activeTab === "information" && (
          <div>
            <h4>Product Information</h4>
            <p className="text-muted">{information}</p>
          </div>
        )}
        {/* {activeTab === "reviews" && (
          <div>
            <h4>Customer Reviews</h4>
            <p className="text-muted">No reviews yet. Be the first to review this product.</p>
          </div>
        )} */}
      </div>
    </>
  );
}
