import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // 加入這行才能用 toBeInTheDocument
import App from "./App";
import userEvent from "@testing-library/user-event";

// 測試進入時是否有顯示內文「Todo Application 與 input 中的 placeholder」
// describe("1.進入時是否有顯示文字", () => {
//   // 測試之前執行 (beforeEach)
//   beforeEach(() => {
//     render(<App />);
//   });
//   test("1-1.是否有顯示標題 Todo Application (title)", () => {
//     const titleFont = screen.getByText("Todo Application");

//     expect(titleFont).toBeInTheDocument();
//   });
//   test("1-2.進入時是否有顯示 Add Somthing...(placeholder)", () => {
//     const placeholderText = screen.getByPlaceholderText("Add somthing.......");

//     expect(placeholderText).toBeInTheDocument();
//   });
// });

// describe("2.測試輸入 input 後點擊 Add btn 是否有出現表單", () => {
//   beforeEach(async () => {
//     render(<App />);
//     const inputText = screen.getByPlaceholderText("Add somthing.......");
//     const addbtn = screen.getByText("Add Todo");

//     // 模擬使用者輸入的行為
//     await userEvent.type(inputText, "今天記得刷載具");
//     // 模擬使用者點擊按鈕的行為
//     await userEvent.click(addbtn);
//   });
//   test("2-1輸入表單", async () => {
//     //確認是否有輸入並顯示在畫面上
//     expect(screen.getByText("今天記得刷載具")).toBeInTheDocument();
//   });
//   test("2-2表單輸入後，是否有「更多」「編輯」「移除」「完成」的選項", async () => {
//     // 先抓「更多」的選項
//     const EllipsisBtn = screen.getByLabelText("Ellipsis");
//     // 按下「更多」的選項後再抓取其他的元素
//     await userEvent.click(EllipsisBtn);

//     const editbtn = screen.getByLabelText("edit");
//     const removebtn = screen.getByLabelText("remove");
//     const checkbtn = screen.getByLabelText("check");
//     // 是否有顯示在畫面上
//     expect(editbtn).toBeVisible();
//     expect(removebtn).toBeVisible();
//     expect(checkbtn).toBeVisible();
//   });
// });

describe("3.測試表單開啟之後的行為", () => {
  beforeEach(async () => {
    render(<App />);
    const inputText = screen.getByPlaceholderText("Add somthing.......");
    const addbtn = screen.getByText("Add Todo");
    // 模擬使用者輸入的行為
    await userEvent.type(inputText, "今天記得刷載具");
    // 模擬使用者點擊按鈕的行為
    await userEvent.click(addbtn);
    // 先抓「更多」的選項
    const EllipsisBtn = screen.getByLabelText("Ellipsis");
    // 按下「更多」的選項後再抓取其他的元素
    await userEvent.click(EllipsisBtn);

    // const removebtn = screen.getByLabelText("remove");
    // const checkbtn = screen.getByLabelText("check");
    // const editbtn = screen.getByLabelText("edit");
  });
  test("3-1.點選刪除後是否不在文件內", async () => {
    const removebtn = screen.getByLabelText("remove");
    // 模擬使用者點擊刪除的行為
    await userEvent.click(removebtn);
    // 該條 DOM 元素是否已不再畫面上
    await waitFor(() => {
      expect(screen.queryByText("今天記得刷載具")).not.toBeInTheDocument();
    });
  });
  test("3-2.勾選完成後是否有新增「完成」的 Class Name", async () => {});
  // test("3-3.點選編輯並儲存後文件是否有更新", async () => {});
});
