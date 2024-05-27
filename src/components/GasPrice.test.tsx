import React from "react";
import { render, screen } from "@testing-library/react";
import GasPrice from "./GasPrice";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          result: {
            SafeGasPrice: "10",
            ProposeGasPrice: "20",
            FastGasPrice: "30",
          },
        }),
    } as Response)
  );
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore();
});

test("renders loading state initially", () => {
  render(<GasPrice />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders error message on fetch failure", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() => Promise.reject(new Error("API is down")));

  render(<GasPrice />);
  expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
});

test("renders gas prices correctly", async () => {
  render(<GasPrice />);
  expect(
    await screen.findByText(/Safe Gas Price: 10 Gwei/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/Proposed Gas Price: 20 Gwei/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/Fast Gas Price: 30 Gwei/i)
  ).toBeInTheDocument();
});
