import ProductList from "../../components/ProductList";
import ShopBreadcrumb from "../../components/ShopBreadcrumb";
import ShopFilters from "../../components/ShopFilters";
import { ProductData, DropdownsData } from "../../types/types";
import productsData from "../../mockData/products.json";
import dropdownsData from "../../mockData/dropdowns.json";

const products: ProductData[] = productsData as ProductData[];
const dropdowns: DropdownsData = dropdownsData as DropdownsData;

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const category = params.category as string;
  const age = params.age as string;

  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  if (age) {
    filteredProducts = filteredProducts.filter(p => p.ageRange === age);
  }

  const breadcrumbTitle = category ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : age ? `Age ${age}` : "Shop List";
  return (
    <div className="container-fluid">
      <ShopBreadcrumb current={breadcrumbTitle} />
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
                      {dropdowns.sortOptions.map((option) => (
                        <a key={option.value} className="dropdown-item" href="#">{option.label}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductList products={filteredProducts} />
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
