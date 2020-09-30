import React from "react";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  title: string;
  subItems?: Array<MenuItemProps>;
  url?: string;
}

export const MyMenuItem: React.FC<MenuItemProps> = (props) => {
  const [openSubitems, setOpenSubitems] = React.useState(false);
  const toggleSubitems = () => setOpenSubitems((oldValue) => !oldValue);

  return (
    <div>
      <Link to={props.url} className="link-decorations">
        <div className="h4 pt-3 cursor-pointer" onClick={toggleSubitems}>
          {props.title}
        </div>
      </Link>
      {openSubitems &&
        props.subItems &&
        props.subItems.map((subItem) => (
          <Link to={subItem.url} className="link-decorations">
            <div className="pt-1 pl-2 cursor-pointer">{subItem.title}</div>
          </Link>
        ))}
    </div>
  );
};
