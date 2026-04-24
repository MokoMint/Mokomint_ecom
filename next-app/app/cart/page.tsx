"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const shipping = items.length > 0 ? 99 : 0;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="/">
                Home
              </a>
              <span className="breadcrumb-item active">Shopping Cart</span>
            </nav>
          </div>
        </div>
        <div className="row px-xl-5 mb-5">
          <div className="col-12 text-center">
            <h3 className="mb-4">Your cart is empty</h3>
            <p className="text-muted mb-4">
              Add items to your cart to get started.
            </p>
            <Link href="/shop" className="btn btn-primary px-5 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <span className="breadcrumb-item active">Shopping Cart</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      {item.images && item.images.length > 0 ? (
                        <div
                          style={{
                            position: "relative",
                            width: 50,
                            height: 50,
                          }}
                        >
                          <Image
                            src={item.images[0].url}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{ width: 50, height: 50, background: "#eee" }}
                        />
                      )}
                      <span className="text-left">{item.title}</span>
                    </div>
                  </td>
                  <td className="align-middle">₹{item.price.toFixed(2)}</td>
                  <td className="align-middle">
                    <div className="quantity d-inline-flex align-items-center">
                      <button
                        className="btn btn-sm btn-primary btn-minus"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        className="form-control form-control-sm bg-secondary border-0 text-center"
                        type="text"
                        value={item.quantity}
                        readOnly
                        style={{ width: 50 }}
                      />
                      <button
                        className="btn btn-sm btn-primary btn-plus"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="align-middle">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          <form className="mb-30" action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control p-4"
                placeholder="Coupon Code"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  Apply Coupon
                </button>
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
                <h6 className="font-weight-medium">₹{totalPrice.toFixed(2)}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">₹{shipping.toFixed(2)}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Tax (18%)</h6>
                <h6 className="font-weight-medium">₹{tax.toFixed(2)}</h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Total</h6>
                <h6 className="font-weight-medium">₹{grandTotal.toFixed(2)}</h6>
              </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <button className="btn btn-block btn-primary my-3 py-3">
                Proceed To Checkout
              </button>
              <button
                type="button"
                className="btn btn-block btn-outline-danger my-2 py-2"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//               </div>
//             </div>
//           </form>
//           <div className="card border-secondary mb-5">
//             <div className="card-header bg-secondary border-0">
//               <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
//             </div>
//             <div className="card-body">
//               <div className="d-flex justify-content-between mb-3 pt-1">
//                 <h6 className="font-weight-medium">Subtotal</h6>
//                 <h6 className="font-weight-medium">$246</h6>
//               </div>
//               <div className="d-flex justify-content-between mb-3 pt-1">
//                 <h6 className="font-weight-medium">Shipping</h6>
//                 <h6 className="font-weight-medium">$10</h6>
//               </div>
//               <div className="d-flex justify-content-between mb-3 pt-1">
//                 <h6 className="font-weight-medium">Tax</h6>
//                 <h6 className="font-weight-medium">$5</h6>
//               </div>
//               <div className="d-flex justify-content-between mb-3 pt-1">
//                 <h6 className="font-weight-medium">Total</h6>
//                 <h6 className="font-weight-medium">$261</h6>
//               </div>
//             </div>
//             <div className="card-footer border-secondary bg-transparent">
//               <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
