import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Gas Price title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Gas Price/i);
  expect(linkElement).toBeInTheDocument();
});
