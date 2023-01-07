import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./Layouts/MetaData";
import Slider from "rc-slider";
import "../App.css";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./Layouts/Loader";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

// import { useAlert } from 'react-alert';

// const  createSliderWithTooltip =  Slider.createSliderWithTooltip;
// const Range =createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [brand, setBrand] = useState("");

  const allbrands = [
    "Iphone",
    "Samsung",
    "Vivo",
    "Oppo",
    "Realme",
    "Xiomi",
    "OnePlus",
    "Nokia",
    "Tecno",
    "Lenovo",
    "Sony",
    "LG",
    "others",
  ];

  // const alert =useAlert();
  const dispatch = useDispatch();

  const { loading, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  //console.log(products)
  const { keyword } = useParams();

  useEffect(() => {
    // if(error){
    //    alert.error(error)

    // }
    //
    dispatch(getProducts(keyword, currentPage, brand));
  }, [dispatch, currentPage, keyword, brand]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container conatiner-fluid">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy best Quality Mobile Phones"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              <Fragment>
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                    <Slider
                      range
                      marks={{
                        1: `$1`,
                        1000000: `$1000000`,
                      }}
                      min={1}
                      max={1000000}
                      defaultValue={[1, 1000000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: "top",
                        visible: true,
                      }}
                      //value={price}
                      onChange={(price) => setPrice(price)}
                    />

                    <hr className="my-5" />
                    <div className="mt-5">
                      <h4 className="mb-3">Brands</h4>
                      <ul className="p1-0">
                        {allbrands.map((brand) => (
                          <li
                            style={{ cursor: "pointer", listStyleType: "none" }}
                            key={brand}
                            onClick={() => setBrand(brand)}
                          >
                            {brand}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Fragment>

              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>

          {productsCount && <div className="d-flex justify-content-center mt-5">
            {console.log("productsCount: ", productsCount)}
            {console.log(typeof productsCount)}
            {console.log(resPerPage, "resPerPageresPerPageresPerPageresPerPage")}
            <Pagination
              activePage={currentPage   }
              // activePage={1}
              itemsCountPerPage={4}
              totalItemsCount={20}
              pageRangeDisplayed={5}
               itemClass="page-item"
              linkClass="page-link"
                            onChange={setCurrentPageNo}

              

              


              // itemsCountPerPage={resPerPage}
              // pageRangeDisplayed={productsCount /resPerPage}
              // totalItemsCount={productsCount}
              // onChange={setCurrentPageNo}
              // nextPageText={"Next"}
              // prevPageText={"Previous"}
              // firstPageText={"First"}
              // lastPageText={"Last"}
              // itemClass="page-item"
              // linkClass="page-link"
            />
            
          </div>}
        </Fragment>
      )}
    </div>
  );
};

export default Home;
