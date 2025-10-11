import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // 加入這行才能用 toBeInTheDocument
import App from "./App";
// 測試進入時是否有顯示內文「Todo Application」
test("進入時是否有顯示文字", () => {
  render(<App />);
  const titleFont = screen.getByText("Todo Application");

  expect(titleFont).toBeInTheDocument();
});
