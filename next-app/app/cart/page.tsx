export default function CartPage() {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">Home</a>
            <span className="breadcrumb-item active">Shopping Cart</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {[1, 2].map((item) => (
                <tr key={item}>
                  <td className="align-middle">
                    <img src={`/img/product-${item}.jpg`} alt="" style={{ width: 50 }} /> Product {item}
                  </td>
                  <td className="align-middle">$123</td>
                  <td className="align-middle">
                    <div className="quantity d-inline-flex align-items-center">
                      <button className="btn btn-sm btn-primary btn-minus">-</button>
                      <input className="form-control form-control-sm bg-secondary border-0 text-center" type="text" value="1" readOnly style={{ width: 50 }} />
                      <button className="btn btn-sm btn-primary btn-plus">+</button>
                    </div>
                  </td>
                  <td className="align-middle">$123</td>
                  <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          <form className="mb-30" action="">
            <div className="input-group">
              <input type="text" className="form-control p-4" placeholder="Coupon Code" />
              <div className="input-group-append">
                <button className="btn btn-primary">Apply Coupon</button>
              </div>
            </div>
          </form>
          <div className="card border-secondary mb-5">
            <div className="card-header bg-secondary border-0">
              <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Subtotal</h6>
                <h6 className="font-weight-medium">$246</h6>
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
                <h6 className="font-weight-medium">$261</h6>
              </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
