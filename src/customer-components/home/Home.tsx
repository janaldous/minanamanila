import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import Button from "react-bootstrap/Button";
import { Routes } from "Routes";
import { ProductGrid } from "customer-components/productgrid/ProductGrid";
import featuredPicture from "../featured.jpg";

function Home() {
  return (
    <div className="home-container">
      <div className="featured-picture position-relative">
        <img src={featuredPicture} alt="Featured" className="w-100 picture"/>
        <div className="words h1">Minana Manila</div>
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
      <section id="the-bread">
        <div className="row">
          <div className="section-title center">Your Online Ukay-Ukay</div>
        </div>
        <div className="row justify-content-center">
          <div className="description">
            <p> 
              Freshly baked and healthy banana bread with almonds, walnuts,
              cinnamon, lemon zest and muscovado sugar.
            </p>
            <p>
              Crunchy and nutty on the top and light and moist in the inside.
            </p>
            <p>
              Only <b>₱165</b> per loaf (delivery included)
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <Link to={Routes.Products}>
            <Button variant="primary" size="lg">
              Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
