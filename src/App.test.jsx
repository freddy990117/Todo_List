import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // 加入這行才能用 toBeInTheDocument
import App from "./App";
import userEvent from "@testing-library/user-event";

// 測試進入時是否有顯示內文「Todo Application 與 input 中的 placeholder」
// describe("進入時是否有顯示文字", () => {
//   // 測試之前執行 (beforeEach)
//   beforeEach(() => {
//     render(<App />);
//   });
//   test("1.是否有顯示標題 Todo Application (title)", () => {
//     const titleFont = screen.getByText("Todo Application");

//     expect(titleFont).toBeInTheDocument();
//   });
//   test("2.進入時是否有顯示 Add Somthing...(placeholder)", () => {
//     const placeholderText = screen.getByPlaceholderText("Add somthing.......");

//     expect(placeholderText).toBeInTheDocument();
//   });
// });

describe("測試輸入 input 後點擊 Add btn 是否有出現表單", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("輸入表單", async () => {
    const inputText = screen.getByPlaceholderText("Add somthing.......");
    const addbtn = screen.getByText("Add Todo");

    // 模擬使用者輸入的行為
    await userEvent.type(inputText, "今天記得刷載具");
    // 模擬使用者點擊按鈕的行為
    await userEvent.click(addbtn);

    expect(screen.getByText("今天記得刷載具")).toBeInTheDocument();
  });
});
