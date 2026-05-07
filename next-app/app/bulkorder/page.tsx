"use client";

import { useState } from "react";

export default function BulkOrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    // Open WhatsApp with form data
    window.open(whatsappLink, "_blank");

    alert("Bulk inquiry submitted!");
  };

  const message = `Hi Mokomint! 

I am interested in placing a bulk order for your educational wooden toys.

 *Order Inquiry Details:*
• Name: ${form.name}
• Phone: ${form.phone}
• Email: ${form.email || "Not provided"}
• Quantity Required: ${form.quantity} units
• Specific Requirements: ${form.message || "As per catalog"}

Please provide me with:
 • Pricing details for bulk quantity
 • Available customization options (logo print, branding)
 • Estimated delivery timeline
 • Payment terms and MOQ (Minimum Order Quantity)
 • Product catalog and available options

Looking forward to your response!

Thanks,
${form.name}`;

  const whatsappLink = `https://wa.me/919251264027?text=${encodeURIComponent(message)}`;

  return (
    <div className="container py-5">
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          Bulk Orders for Schools & Return Gifts 🎁
        </h1>
        <p className="text-muted mt-3">
          Order premium educational wooden toys in bulk for schools, birthday
          parties, and gifting purposes.
        </p>
      </div>

      {/* BENEFITS */}
      <div className="row text-center mb-5">
        {[
          { title: "Custom Branding", desc: "Add your logo on products" },
          { title: "Affordable Pricing", desc: "Best rates for bulk quantity" },
          { title: "Safe & Educational", desc: "Montessori-based toys" },
          { title: "Fast Delivery", desc: "Quick dispatch across India" },
        ].map((item, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <h5 className="fw-bold">{item.title}</h5>
              <p className="text-muted small">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT TYPES */}
      <div className="mb-5">
        <h3 className="fw-bold text-center mb-4">Available Bulk Categories</h3>
        <div className="row text-center">
          {[
            "Alphabet Boards",
            "Number Puzzles",
            "Hindi Learning Boards",
            "Shape Sorters",
            "Fruits & Vegetables",
            "Return Gift Combos",
          ].map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="p-3 border rounded bg-light">{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="p-4 shadow rounded bg-white">
            <h4 className="fw-bold mb-3 text-center">Request Bulk Quote</h4>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity Required"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Requirement (Product type, logo print, etc.)"
                className="form-control mb-3"
                rows={4}
                onChange={handleChange}
              />

              <button className="btn btn-primary w-100">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-5">
        <h4 className="fw-bold">Need Help Choosing?</h4>
        <p className="text-muted">
          Contact our team to get the best bulk deal for your requirement.
        </p>
        {/* <a href="tel:+919999999999" className="btn btn-dark">
          Call Now
        </a> */}
        {/* <a
          // href="https://wa.me/+919711972036?text=Hi%20Mokomint,%20I%20want%20bulk%20order%20details"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark"
        >
          Chat on WhatsApp
        </a> */}
      </div>
    </div>
  );
}
