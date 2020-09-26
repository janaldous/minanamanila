import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("smoke test", () => {
    window.location.search = "";
    render(<App />);
  });

});
