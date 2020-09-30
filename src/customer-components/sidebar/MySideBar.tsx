import React from "react";
import { Routes } from "Routes";
import { MyMenuItem, MenuItemProps } from "./MyMenuItem";
import "./MySideBar.scss";

const sidebarItems: Array<MenuItemProps> = [
  {
    title: "What are you looking for?",
    subItems: [
      { title: "Shirts", url: Routes.SearchResult },
      { title: "Shorts", url: Routes.SearchResult },
      { title: "Pants", url: Routes.SearchResult },
      { title: "Dresses", url: Routes.SearchResult },
      { title: "Athleisure", url: Routes.SearchResult },
      { title: "Shoes", url: Routes.SearchResult },
      { title: "Bags", url: Routes.SearchResult },
      { title: "Accessories", url: Routes.SearchResult },
      { title: "Others", url: Routes.SearchResult },
    ],
  },
  {
    title: "Who are we?",
    subItems: [
      { title: "Our Mission", url: Routes.SearchResult },
      { title: "The Minana Community" },
    ],
  },
  {
    title: "Sustainable Fashion Responsibility Agreement",
    url: Routes.SearchResult,
  },
  {
    title: "Your Measurements",
    url: Routes.SearchResult,
  },
  {
    title: "The Tawad",
    url: Routes.SearchResult,
  },
];

export const MySideBar: React.FC<{}> = (props) => {
  return (
    <div className="my-sidebar">
      <div className="sidebar-header">
        <div>
          {sidebarItems.map((menuItem) => (
            <MyMenuItem key={menuItem.title} {...menuItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
