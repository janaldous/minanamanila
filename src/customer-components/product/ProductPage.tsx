import React from "react";
import PublicApi from "../../api/PublicApi";
import { Product } from "../../api/models";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../logo.jpg";
import "./ProductPage.scss";
import Button from "react-bootstrap/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { isBrowser } from "react-device-detect";
import { ProductCheckoutItem } from "./ProductCheckoutItem/ProductCheckoutItem";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { formatCurrency } from "utils/CurrencyFormatterUtil";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CustomerContext } from "customer-components/CustomerContext";
import { Routes } from "Routes";

export type ProductRequired = Required<Product>;

export type ProductRequiredDto = ProductRequired & {
  quantity: number;
};

const cartCheck = (
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 16 16"
    className="bi bi-cart-check"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
    />
    <path
      fillRule="evenodd"
      d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

export const ProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<Array<ProductRequired>>([]);
  const [checkoutOpen, setCheckoutOpen] = React.useState<boolean>(false);

  const { cart, onAddToCart } = React.useContext(CustomerContext);

  React.useEffect(() => {
    PublicApi.getProducts(0, 5).then((res) => {
      setProducts(
        res.data.map((d) => ({
          ...d,
          code: d.code || "",
          description: d.description || "",
          id: d.id || 1,
          name: d.name || "",
          unitPrice: d.unitPrice || 0,
        }))
      );
    });
  }, []);

  const handleIncreaseQuantity = (product: ProductRequiredDto) => {
    console.log("increasing quantity");
    onAddToCart(product, "increase");
  };

  const handleDecreaseQuantity = (product: ProductRequiredDto) => {
    onAddToCart(product, "decrease");
  };

  const handleCartClick = () => {
    if (cart.numberOfItems > 0) {
      setCheckoutOpen((old) => !old);
    }
  };

  return (
    <div className="product">
      <div className="order-container">
        <Navbar className="custom-navbar">
          <div className="flex-1-only">
            <Link to={"/"}>
              {isBrowser ? "< Back to Home" : <ArrowBackIosIcon />}
            </Link>
          </div>
          <Navbar.Brand className="nav-brand" href="/">
            <img src={logo} alt="Logo" className="logo" />
          </Navbar.Brand>
          <div className="flex-1-only d-flex">
            <div className="flex-1-only"></div>
            <div
              className="shopping-cart"
              style={{ cursor: "pointer" }}
              onClick={handleCartClick}
            >
              {cartCheck}
            </div>
          </div>
        </Navbar>
        <div className="content">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() =>
                handleIncreaseQuantity({ ...product, quantity: 0 })
              }
            />
          ))}
        </div>
        <div id="cd-cart" className={checkoutOpen ? "speed-in" : ""}>
          <div className="h3 text-center mb-2">Cart</div>
          <div className="cd-cart-items">
            {cart.items.map((product) => (
              <ProductCheckoutItem
                product={product}
                onIncrease={() => handleIncreaseQuantity(product)}
                onDecrease={() => handleDecreaseQuantity(product)}
                key={product.id}
              />
            ))}
          </div>
          <div className="border-top mb-2"></div>
          <div className="cd-cart-total mb-2">
            <Row>
              <Col xs={9}>Total</Col>
              <Col xs={3}>{formatCurrency(cart.total)}</Col>
            </Row>
          </div>
          <Link to={Routes.Checkout}>
            <Button className="w-100">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
