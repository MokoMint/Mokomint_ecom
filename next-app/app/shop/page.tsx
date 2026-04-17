import ProductList from "../../components/ProductList";
import ShopBreadcrumb from "../../components/ShopBreadcrumb";
import ShopFilters from "../../components/ShopFilters";
import { ProductData } from "../../types/types";
import productsData from "../../mockData/products.json";

const products: ProductData[] = productsData as ProductData[];

export default function ShopPage() {
  return (
    <div className="container-fluid">
      <ShopBreadcrumb current="Shop List" />
      <div className="row px-xl-5">
        <ShopFilters />
        <div className="col-lg-9 col-md-8">
          <div className="row pb-3">
            <div className="col-12 pb-1">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                  <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button>
                </div>
                <div className="ml-2">
                  <div className="dropdown">
                    <button className="btn border dropdown-toggle" type="button" id="sortMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sort by
                    </button>
                    <div className="dropdown-menu" aria-labelledby="sortMenu">
                      <a className="dropdown-item" href="#">Latest</a>
                      <a className="dropdown-item" href="#">Popularity</a>
                      <a className="dropdown-item" href="#">Best Rating</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductList products={products} />
          <div className="row">
            <div className="col-12">
              <nav>
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
