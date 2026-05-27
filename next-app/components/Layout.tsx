"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { DropdownsData, NavigationItem, CategoryItem } from "../types/types";
import dropdownsData from "../mockData/dropdowns.json";
import navigationData from "../mockData/navigation.json";
import categoriesData from "../mockData/categories.json";
import Ticker from "./Ticker";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const dropdowns: DropdownsData = dropdownsData as DropdownsData;
const pages: NavigationItem[] = navigationData as NavigationItem[];
const categories: CategoryItem[] = categoriesData as CategoryItem[];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalItemCount = items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
  return (
    <>
      <div className="container-fluid">
        {/* <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="#">About</a>
              <a className="text-body mr-3" href="#">Contact</a>
              <a className="text-body mr-3" href="#">Help</a>
              <a className="text-body mr-3" href="#">FAQs</a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                  My Account
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {dropdowns.account.map((item) => (
                    <Link key={item.href} href={item.href} className="dropdown-item">{item.label}</Link>
                  ))}
                </div>
              </div>
              <div className="btn-group mx-2">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                  USD
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {dropdowns.currency.map((item) => (
                    <button key={item.value} className="dropdown-item" type="button">{item.label}</button>
                  ))}
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {dropdowns.language.map((item) => (
                    <button key={item.value} className="dropdown-item" type="button">{item.label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="#" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: 2 }}>0</span>
              </a>
              <a href="#" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: 2 }}>0</span>
              </a>
            </div>
          </div>
        </div> */}
        <div
          className="row align-items-center py-3 px-xl-5 d-none d-lg-flex"
          style={{ backgroundColor: "#ffffff" }}
          // f5f1ea
        >
          <div className="col-lg-4">
            <Link href="/" className="text-decoration-none">
              <Image
                src="/img/Mokomint_logo.jpeg"
                alt="Mokomint Logo"
                width={240}
                height={60}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form>
              <div className="input-group">
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                /> */}
                {/* <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div> */}
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+91 92512 64027</h5>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark mb-1">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2"></i>Categories
              </h6>
              <i className="fa fa-angle-down text-dark"></i>
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 999 }}
            >
              <div className="navbar-nav w-100">
                {categories.map((category) =>
                  category.hasDropdown ? (
                    <div
                      key={category.label}
                      className="nav-item dropdown dropright"
                    >
                      <Link
                        href={category.href}
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        onClick={() => {
                          document
                            .getElementById("navbar-vertical")
                            ?.classList.remove("show");
                        }}
                      >
                        {category.label}{" "}
                        <i className="fa fa-angle-right float-right mt-1"></i>
                      </Link>
                      <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                        {category.subItems?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="dropdown-item"
                            onClick={() => {
                              document
                                .getElementById("navbar-vertical")
                                ?.classList.remove("show");
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={category.label}
                      href={category.href}
                      className="nav-item nav-link"
                      onClick={() => {
                        document
                          .getElementById("navbar-vertical")
                          ?.classList.remove("show");
                      }}
                    >
                      {category.label}
                    </Link>
                  ),
                )}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link href="/" className="text-decoration-none d-block d-lg-none">
                <Image
                  src="/img/Mokomint_logo.jpeg"
                  alt="Mokomint Logo"
                  width={200}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  {pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`nav-item nav-link${pathname === page.href ? " active" : ""}`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link href="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}
                    >
                      {totalItemCount}
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <main>{children}</main>
      {/* <Ticker /> */}
      {/* <new-marquee speed="40" direction="left" pauseonhover="true">
        <div className="flex gap-10">
          <span>🚚 Free Delivery above ₹2999</span>
          <span>🎁 Free Gifts above ₹4999</span>
          <span>📦 Opening video required for claims</span>
        </div>
      </new-marquee> */}

      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">
              At MokoMint, we’re passionate about bringing joy and learning
              together through thoughtfully designed kids’ toys. Whether you
              have a question, feedback, or just want to say hello — we’d love
              to hear from you!
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>Rangoli
              Garden, Jaipur, Rajasthan, India
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              mokomint.official@gmail.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+91 92512
              64027
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Quick Shop
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link href="#" className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link href="/shop" className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  My Account
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link href="/about" className="text-secondary">
                    <i className="fa fa-angle-right mr-2"></i>About Us
                  </Link>
                  <Link href="/contact" className="text-secondary">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </Link>
                  {/* <Link href="#" className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link href="#" className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </Link>

                  <Link href="#" className="text-secondary">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </Link> */}
                </div>
              </div>
              <div className="col-md-4 mb-5">
                {/* <h5 className="text-secondary text-uppercase mb-4">
                  Newsletter
                </h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="#">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email Address"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form> */}
                <h6 className="text-secondary text-uppercase mt-4 mb-3">
                  Follow Us
                </h6>
                <div className="d-flex justify-content-center align-items-center">
                  <Link
                    href="https://x.com/Mokomintstore"
                    className="btn btn-primary btn-square d-flex align-items-center justify-content-center mr-2"
                    target="_blank"
                  >
                    <i className="fab fa-twitter"></i>
                  </Link>

                  <Link
                    href="https://www.facebook.com/profile.php?id=61588319053726"
                    className="btn btn-primary btn-square d-flex align-items-center justify-content-center mr-2"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link
                    href="https://www.youtube.com/@MokoMint_official"
                    className="btn btn-primary btn-square d-flex align-items-center justify-content-center mr-2"
                    target="_blank"
                  >
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link
                    href="https://www.instagram.com/mokomint_official/"
                    className="btn btn-primary btn-square d-flex align-items-center justify-content-center"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row border-top mx-xl-5 py-4"
          style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
        >
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy;{" "}
              {/* <a className="text-primary" href="#">
                Domain
              </a>
              .  */}
              All Rights Reserved. Designed by{" "}
              <a className="text-primary" href="https://mokomint.com">
                Moko Mint
              </a>
            </p>
          </div>
          {/* <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="/img/payments.png" alt="" />
          </div> */}
        </div>
      </div>

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
}
