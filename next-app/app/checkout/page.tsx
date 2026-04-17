export default function CheckoutPage() {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">Home</a>
            <span className="breadcrumb-item active">Checkout</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
          <div className="bg-light p-30 mb-5">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>First Name</label>
                <input className="form-control" type="text" placeholder="John" />
              </div>
              <div className="col-md-6 form-group">
                <label>Last Name</label>
                <input className="form-control" type="text" placeholder="Doe" />
              </div>
              <div className="col-md-6 form-group">
                <label>E-mail</label>
                <input className="form-control" type="text" placeholder="example@email.com" />
              </div>
              <div className="col-md-6 form-group">
                <label>Mobile No</label>
                <input className="form-control" type="text" placeholder="(+123) 456 7890" />
              </div>
              <div className="col-md-6 form-group">
                <label>Address</label>
                <input className="form-control" type="text" placeholder="123 Street" />
              </div>
              <div className="col-md-6 form-group">
                <label>City</label>
                <input className="form-control" type="text" placeholder="New York" />
              </div>
              <div className="col-md-6 form-group">
                <label>Country</label>
                <select className="custom-select">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>France</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>ZIP Code</label>
                <input className="form-control" type="text" placeholder="12345" />
              </div>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="shipto" />
              <label className="custom-control-label" htmlFor="shipto">Ship to different address</label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-secondary mb-5">
            <div className="card-header bg-secondary border-0">
              <h4 className="font-weight-semi-bold m-0">Order Total</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Subtotal</h6>
                <h6 className="font-weight-medium">$249</h6>
              </div>
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">$10</h6>
              </div>
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Tax</h6>
                <h6 className="font-weight-medium">$5</h6>
              </div>
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Total</h6>
                <h6 className="font-weight-medium">$264</h6>
              </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <button className="btn btn-block btn-primary py-3">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
