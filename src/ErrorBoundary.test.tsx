import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders child if there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <MockComponent successful={true} />
      </ErrorBoundary>
    );
    expect(getByText("Successfuly rendered")).toBeInTheDocument();
  });

  it("renders error boundary if there is an error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <MockComponent successful={false} />
      </ErrorBoundary>
    );
    expect(getByText(/Oops/)).toBeInTheDocument();
  });
});

const MockComponent: React.FC<{ successful: boolean }> = (props) => {
  if (!props.successful) throw new Error();
  return <div>Successfuly rendered</div>;
};
