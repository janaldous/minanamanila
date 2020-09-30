import React from "react";
import { TextPage, TextPageProps } from "../TextPage";

export const CommingSoonPage: React.FC<TextPageProps> = (props) => {
  return (
    <TextPage
      {...props}
    >
      <div className="d-flex justify-content-center align-items-center coming-soon">Coming Soon</div>
    </TextPage>
  );
};
