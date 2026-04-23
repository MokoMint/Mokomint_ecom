"use client";

import { useEffect } from "react";

export default function Ticker() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/Sean-93/newmarquee@v0.9.1/dist/newmarquee-min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-yellow-300 py-2">
      <new-marquee speed="40" direction="left" pauseonhover="true">
        <div className="flex gap-10 text-sm font-medium">
          <span>🚚 Free Delivery above ₹2999</span>
          <span>🎁 Free Gifts above ₹4999</span>
          <span>📦 Opening video required for claims</span>
        </div>
      </new-marquee>
    </div>
  );
}
