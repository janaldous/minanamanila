import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Order from "./cart/Order";
import instagramLogo from "./icons8-instagram-96.png";
import logoImage from "./minanamanila_thread.png";
import "./Customer.scss";
import { Feature } from "@paralleldrive/react-feature-toggles";
import NotFoundComponent from "NotFoundComponent";
import { ProductPage, ProductRequiredDto } from "./product/ProductPage";
import { Routes } from "Routes";
import { CustomerContext, CheckoutCart } from "./CustomerContext";
import { ProductDetailWithApi } from "./detail/ProductDetail";
import { SearchResults } from "./search/Search";
import { MyNavbar } from "./navbar/Navbar";
import { MySideBar } from "./sidebar/MySideBar";
import { WhoAreWePage } from "./textpage/WhoAreWePage";
import { SFRAPage } from "./textpage/SFRAPage";
import { TheTawadPage } from "./textpage/comingsoon/TheTawadPage";
import { YourMeasurementsPage } from "./textpage/comingsoon/YourMeasurementsPage";

const Customer: React.FC<{}> = () => {
  const [cart, setCart] = React.useState<CheckoutCart>({
    items: [],
    total: 0,
    numberOfItems: 0,
  });

  const handleCartChange = (
    product: ProductRequiredDto,
    operation: "increase" | "decrease" | "set",
    quantity?: number
  ) => {
    setCart((cart) => {
      const itemIndex = cart.items.findIndex((i) => i.id === product.id);
      let newItems = cart.items;
      let numberOfItems = 0;
      if (itemIndex > -1) {
        const oldQuantity = newItems[itemIndex].quantity;
        let changeInQuantity = 0;
        if (operation === "set" && !!quantity) {
          changeInQuantity = quantity - oldQuantity;
        } else if (operation === "increase") {
          changeInQuantity = 1;
        } else if (operation === "decrease") {
          changeInQuantity = -1;
        }
        const newQuantity = oldQuantity + changeInQuantity;
        numberOfItems = numberOfItems + changeInQuantity;

        newItems = cart.items
          .map((p) => {
            if (p.id === product.id) {
              return {
                ...p,
                quantity: newQuantity,
              };
            } else {
              return p;
            }
          })
          .filter((p) => p.quantity > 0);
      } else {
        product.quantity += 1;
        numberOfItems += product.quantity;
        newItems = [...newItems, product];
      }
      const total = newItems.reduce(
        (prev, cur) => prev + cur.quantity * cur.unitPrice,
        0
      );
      console.log("new cart", {
        ...cart,
        items: [...newItems, product],
        numberOfItems,
        total,
      });
      return {
        ...cart,
        items: newItems,
        numberOfItems,
        total,
      };
    });
  };

  const handleAddToCart = (
    product: ProductRequiredDto,
    operation: "increase" | "decrease" | "set"
  ) => {
    handleCartChange(product, operation);
  };

  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);
  const toggleSidebar = () => setSideBarOpen((oldValue) => !oldValue);

  return (
    <div className="app-container">
      <CustomerContext.Provider
        value={{
          cart,
          onAddToCart: handleAddToCart,
          onCartChange: handleCartChange,
          sideBarOpen,
          toggleSidebar,
        }}
      >
        <Router>
          <div className="wrapper">
            <nav id="sidebar" className={`${!sideBarOpen ? "active" : ""}`}>
              <MySideBar />
            </nav>
            <div className="w-100">
              <MyNavbar toggleSideBar={toggleSidebar} />
              <Switch>
                <Route path={Routes.Checkout}>
                  <Feature
                    name="online-order"
                    inactiveComponent={NotFoundComponent}
                    activeComponent={Order}
                  />
                </Route>
                <Route path={Routes.Products}>
                  <Feature
                    name="online-order"
                    inactiveComponent={NotFoundComponent}
                    activeComponent={ProductPage}
                  />
                </Route>
                <Route path={Routes.Tawad}>
                  <TheTawadPage />
                </Route>
                <Route path={Routes.YourMeasurements}>
                  <YourMeasurementsPage />
                </Route>
                <Route path={Routes.SFRAPage}>
                  <SFRAPage />
                </Route>
                <Route path={Routes.AboutUs}>
                  <WhoAreWePage />
                </Route>
                <Route path={Routes.SearchResult}>
                  <SearchResults />
                </Route>
                <Route path={Routes.Detail}>
                  <ProductDetailWithApi />
                </Route>
                <Route path={Routes.Home}>
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </CustomerContext.Provider>
      <footer>
        <div className="footer-item">Minana Manila</div>
        <div className="footer-item">
          <a href="https://www.instagram.com/breadforyouph/">
            <picture>
              <img
                className="instagram-icon"
                srcSet={instagramLogo}
                alt="Instagram link"
              />
            </picture>
          </a>
          <picture>
            <img
              className="instagram-icon"
              srcSet={logoImage}
              alt="Minana Logo"
            />
          </picture>
        </div>
      </footer>
    </div>
  );
};

export default Customer;
