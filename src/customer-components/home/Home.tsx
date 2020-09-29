import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { Routes } from "Routes";
import { ProductGrid } from "customer-components/productgrid/ProductGrid";
import featuredPicture from "../featured.jpg";

function Home() {
  return (
    <div className="home-container">
      <div className="featured-picture position-relative">
        <img src={featuredPicture} alt="Featured" className="w-100 picture" />
        <div className="words">
          <span className="first-line">This is Minana Manila.</span>
          <br />Your new favorite go-to thrift store.
        </div>
      </div>
      <section id="items">
        <div className="categories d-flex">
          {["Men", "Women", "Children"].map((x) => (
            <Link to={Routes.SearchResult} key={x}>
              <div className="pr-3 pb-3 category">{x}</div>
            </Link>
          ))}
        </div>
        <ProductGrid maxRows={5} />
      </section>
    </div>
  );
}

export default Home;
