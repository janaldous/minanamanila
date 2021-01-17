import React from "react";

export interface CustomerContextStuff {
  sideBarOpen: boolean;
  toggleSidebar: () => void;
}

export const CustomerContext = React.createContext<CustomerContextStuff>({
  sideBarOpen: false,
  toggleSidebar: () => console.log,
});
