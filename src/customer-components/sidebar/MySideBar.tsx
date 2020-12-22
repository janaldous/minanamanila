import React from "react";
import { Routes } from "Routes";
import { MyMenuItem, MenuItemProps } from "./MyMenuItem";
import "./MySideBar.scss";

const sidebarItems: Array<MenuItemProps> = [
  {
    title: "What are you looking for?",
    subItems: [
      { title: "Apple", url: `${Routes.SearchResult}?category=Apple` },
      { title: "Shirts", url: `${Routes.SearchResult}?category=Shirts` },
      { title: "Shorts", url: `${Routes.SearchResult}?category=Shorts` },
      { title: "Pants", url: `${Routes.SearchResult}?category=Pants` },
      { title: "Dresses", url: `${Routes.SearchResult}?category=Dresses` },
      { title: "Athleisure", url: `${Routes.SearchResult}?category=Athleisure` },
      { title: "Shoes", url: `${Routes.SearchResult}?category=Shoes` },
      { title: "Bags", url: `${Routes.SearchResult}?category=Bags` },
      { title: "Accessories", url: `${Routes.SearchResult}?category=Accessories` },
      { title: "Others", url: `${Routes.SearchResult}?category=Others` },
    ],
  },
  {
    title: "Who are we?",
    url: Routes.AboutUs,
  },
  {
    title: "Sustainable Fashion Responsibility Agreement",
    url: Routes.SFRAPage,
  },
  {
    title: "Your Measurements",
    url: Routes.YourMeasurements,
  },
  {
    title: "The Tawad",
    url: Routes.Tawad,
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
