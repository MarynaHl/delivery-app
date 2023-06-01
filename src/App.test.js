import { render, screen } from "@testing-library/react";
import App from "./js/components/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Shop/i);
  expect(linkElement).toBeInTheDocument();
});
