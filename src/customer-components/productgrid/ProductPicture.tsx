import React from "react";
import pic1 from "../../pic1.png";
import pic2 from "../../pic2.png";
import pic3 from "../../pic3.png";
import pic4 from "../../pic4.png";
import pic5 from "../../pic5.png";
import pic6 from "../../pic6.png";
import pic7 from "../../pic7.png";
import pic8 from "../../pic8.png";
import pic9 from "../../pic9.png";
import pic10 from "../../pic10.png";
import pic11 from "../../pic11.png";
import pic12 from "../../pic12.png";

export interface ProductPictureProps {
  id: number;
  className?: string;
}

const pics = {
  1: pic1,
  2: pic2,
  3: pic3,
  4: pic4,
  5: pic5,
  6: pic6,
  7: pic7,
  8: pic8,
  9: pic9,
  10: pic10,
  11: pic11,
  12: pic12,
};

export const ProductPicture: React.FC<ProductPictureProps> = (props) => {
  if (props.id >= 1 && props.id <= 12) {
    return (
      <img
        src={pics[props.id]}
        className={props.className}
        alt={`clothing ${props.id}`}
      />
    );
  } else if (props.id >= 13) {
    return (
      <img
        src={pics[(props.id % 12) + 1]}
        className={props.className}
        alt={`clothing ${props.id}`}
      />
    );
  } else {
    return (
      <img
        src={pic1}
        className={props.className}
        alt={`clothing ${props.id}`}
      />
    );
  }
};
