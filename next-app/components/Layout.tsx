"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Shop Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/contact", label: "Contact" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
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
                  <button className="dropdown-item" type="button">Sign in</button>
                  <button className="dropdown-item" type="button">Sign up</button>
                </div>
              </div>
              <div className="btn-group mx-2">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                  USD
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">EUR</button>
                  <button className="dropdown-item" type="button">GBP</button>
                  <button className="dropdown-item" type="button">CAD</button>
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">FR</button>
                  <button className="dropdown-item" type="button">AR</button>
                  <button className="dropdown-item" type="button">RU</button>
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
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link href="/" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for products" />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: 65, padding: "0 30px" }}>
              <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
              <i className="fa fa-angle-down text-dark"></i>
            </a>
            <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: 999 }}>
              <div className="navbar-nav w-100">
                <div className="nav-item dropdown dropright">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    Dresses <i className="fa fa-angle-right float-right mt-1"></i>
                  </a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                    <a href="#" className="dropdown-item">Men's Dresses</a>
                    <a href="#" className="dropdown-item">Women's Dresses</a>
                    <a href="#" className="dropdown-item">Baby's Dresses</a>
                  </div>
                </div>
                <a href="#" className="nav-item nav-link">Shirts</a>
                <a href="#" className="nav-item nav-link">Jeans</a>
                <a href="#" className="nav-item nav-link">Swimwear</a>
                <a href="#" className="nav-item nav-link">Sleepwear</a>
                <a href="#" className="nav-item nav-link">Sportswear</a>
                <a href="#" className="nav-item nav-link">Jumpsuits</a>
                <a href="#" className="nav-item nav-link">Blazers</a>
                <a href="#" className="nav-item nav-link">Jackets</a>
                <a href="#" className="nav-item nav-link">Shoes</a>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link href="/" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
              </Link>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
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
                  <a href="#" className="btn px-0">
                    <i className="fas fa-heart text-primary"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: 2 }}>0</span>
                  </a>
                  <a href="#" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: 2 }}>0</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <main>{children}</main>

      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Shop Detail</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                  <Link href="#" className="text-secondary"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Shop Detail</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                  <Link href="#" className="text-secondary mb-2"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                  <Link href="#" className="text-secondary"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="#">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Your Email Address" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">Sign Up</button>
                    </div>
                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                <div className="d-flex">
                  <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-top mx-xl-5 py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy; <a className="text-primary" href="#">Domain</a>. All Rights Reserved. Designed by <a className="text-primary" href="https://htmlcodex.com">HTML Codex</a>
            </p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="/img/payments.png" alt="" />
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
    </>
  );
}
