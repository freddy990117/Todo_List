import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // 加入這行才能用 toBeInTheDocument
import App from "./App";

// 測試進入時是否有顯示內文「Todo Application 與 input 中的 placeholder」
describe("進入時是否有顯示文字", () => {
  // 測試之前執行 (beforeEach)
  beforeEach(() => {
    render(<App />);
  });
  test("1.是否有顯示標題 Todo Application (title)", () => {
    const titleFont = screen.getByText("Todo Application");

    expect(titleFont).toBeInTheDocument();
  });
  test("2.進入時是否有顯示 Add Somthing...(placeholder)", () => {
    const placeholderText = screen.getByPlaceholderText("Add somthing.......");

    expect(placeholderText).toBeInTheDocument();
  });
});
