"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container py-5">
      {/* HERO */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Mokomint 🌿</h1>
        <p className="text-muted mt-3">
          Bringing joyful learning to children through safe, educational, and
          beautifully crafted toys.
        </p>
      </div>

      {/* STORY */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="/images/about-toys.jpg"
            alt="Mokomint toys"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Our Story</h3>
          <p className="text-muted">
            Mokomint started with a simple idea — to create meaningful play
            experiences for children. We noticed that most toys lacked
            educational value, so we focused on building products that improve
            cognitive skills while keeping kids engaged.
          </p>
          <p className="text-muted">
            Our wooden puzzles and learning boards are inspired by Montessori
            methods, helping children grow naturally through play.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div className="row text-center mb-5">
        {[
          {
            title: "Safe Materials",
            desc: "Non-toxic and child-safe products",
          },
          {
            title: "Educational Focus",
            desc: "Designed for brain development",
          },
          { title: "Premium Quality", desc: "Durable wooden craftsmanship" },
          { title: "Made for Kids", desc: "Fun + learning together" },
        ].map((item, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <h5 className="fw-bold">{item.title}</h5>
              <p className="text-muted small">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="row text-center mb-5">
        {[
          { number: "10K+", label: "Happy Customers" },
          { number: "50+", label: "Products" },
          { number: "4.8★", label: "Customer Rating" },
          { number: "100%", label: "Safe Materials" },
        ].map((item, index) => (
          <div key={index} className="col-md-3 mb-3">
            <h2 className="fw-bold text-primary">{item.number}</h2>
            <p className="text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE US */}
      <div className="mb-5">
        <h3 className="fw-bold text-center mb-4">Why Choose Mokomint?</h3>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>✔ Montessori-based learning</li>
              <li>✔ Improves motor skills</li>
              <li>✔ Boosts creativity</li>
              <li>✔ Perfect for return gifts</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>✔ Eco-friendly materials</li>
              <li>✔ Affordable pricing</li>
              <li>✔ Bulk order available</li>
              <li>✔ Trusted by parents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h4 className="fw-bold">Explore Our Products</h4>
        <p className="text-muted">
          Discover toys that make learning fun and meaningful.
        </p>

        <Link href="/shop" className="btn btn-primary">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
