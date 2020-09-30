import React from "react";
import { TextPage } from "./TextPage";

export const SFRAPage: React.FC<{}> = () => {
  const text =
    "I promise to…\n" +
    "* Advocate for sustainable consumption and production of clothing and other fashion items.\n" +
    "* Break my fast fashion mindset.\n" +
    "* Dispose and/or recycle my clothes and other fashion items in an environmentally friendly way.\n" +
    "* Continue advocating other environmentally friendly habits beyond clothing and fashion.\n";

  return (
    <TextPage
      title="Sustainability Fashion Responsibility Agreement"
      sections={[
        {
          title: "",
          text: [text],
        },
      ]}
    />
  );
};
