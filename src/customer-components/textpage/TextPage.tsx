import React from "react";
import ReactMarkdown from "react-markdown";
import "./TextPage.scss";

export interface ParagraphProps {
  title: string;
  text: Array<string>;
}

export interface TextPageProps {
  title: string;
  sections: Array<ParagraphProps>;
}

export const TextPage: React.FC<TextPageProps> = (props) => {
  return (
    <div className="text-page-container">
      <div className="h1">{props.title}</div>
      {props.sections.map((section) => (
        <div key={section.title} className="mt-3">
          <div className="h2">{section.title}</div>
          {section.text.map((paragraph) => (
            <div key={paragraph} className="paragraph mt-3">
              <ReactMarkdown source={paragraph} escapeHtml={false} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
