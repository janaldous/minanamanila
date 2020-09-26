import React from "react";
import logo from "../minanamanila_thin-removebg-preview.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import "./Home.scss";
import { useFeatures } from "@paralleldrive/react-feature-toggles";
import Button from "react-bootstrap/Button";
import { Routes } from "Routes";
import ArrowBackIosIcon from "@material-ui/icons/Menu";
import Navbar from "react-bootstrap/Navbar";
import { Item } from "./Item";

const defaultMessage = "Name:\nOrder:\nPayment:\nDelivery:";
const uriDefaultMessage = encodeURIComponent(defaultMessage);
const smsURI = `sms:09178001866;?&body=${uriDefaultMessage}`;

function Home() {
  const features = useFeatures();

  return (
    <div className="home-container">
      <Navbar className="custom-navbar">
        <div className="flex-1-only">
          <ArrowBackIosIcon />
        </div>
        <Navbar.Brand className="nav-brand" href="/">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <div className="flex-1-only"></div>
      </Navbar>
      <Jumbotron>
        <div className="company-name">
          <a
            className="btn btn-primary btn-lg"
            href="#how-to-order"
            role="button"
            id="btn-order"
          >
            Order
          </a>
        </div>
      </Jumbotron>
      <section id="items">
        {[1, 2].map((x) => (
          <div className="row mb-3">
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <Item key={x} className="col" price={x * 100} />
            ))}
          </div>
        ))}
      </section>
      <section id="the-bread">
        <div className="row">
          <div className="section-title center">The Bread</div>
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
      <section id="how-to-order">
        <div className="row">
          <div className="section-title center">How to Order</div>
        </div>
        <div className="instructions">
          <div className="instruction-step">
            <div>
              DM{" "}
              <a href="https://www.instagram.com/breadforyouph/">
                @breadforyouph
              </a>{" "}
              or Text to <a href={smsURI}>09178001866</a>
            </div>
          </div>
          <div className="instruction-step">
            <div className="message">
              <div className="message-line">Name: Juan de la Cruz</div>
              <div className="message-line">Order: 2 original banana bread</div>
              <div className="message-line">
                Mode of payment: COD or GCash to 09178001866
              </div>
              <div className="message-line">
                Delivery: Meet up location or Drop off address
              </div>
            </div>
          </div>
          <div className="instruction-step">
            {features.includes("online-order") && (
              <Link to={Routes.Products}>
                <button className="btn btn-primary" id="btn-order-online">
                  Order online
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="section-title center">About us</div>
        <div className="row justify-content-center">
          <div className="description">
            <p>
              100% of profits go to the Covid-19 Relief Initiative by Saddleback
              Sta. Rosa.
            </p>
            <p>
              Aim: Food Pantry with the goal to feed 5,000 people from Sitio
              Mangumpit, Sitio Buntog, Inchican, Don Jose, Bgry. San Antonio,
              San Pedro, Sitio Hemedes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
