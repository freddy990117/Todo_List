import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // 加入這行才能用 toBeInTheDocument
import App from "./App";
import userEvent from "@testing-library/user-event";

// 測試進入時是否有顯示內文「Todo Application 與 input 中的 placeholder」
describe("1.測試:畫面進入時是否有顯示文字", () => {
  // 測試之前執行 (beforeEach)
  beforeEach(() => {
    render(<App />);
  });
  test("1-1.是否有顯示標題 Todo Application", () => {
    const titleFont = screen.getByText("Todo Application");

    expect(titleFont).toBeInTheDocument();
  });
  test("1-2.是否有顯示 Add Somthing....", () => {
    const placeholderText = screen.getByPlaceholderText("Add somthing.......");

    expect(placeholderText).toBeInTheDocument();
  });
});

// 測試是否會出現更多選項;
describe("2.測試:輸入完成後是否有出現表單", () => {
  // 因為需要等待輸入完成，所以使用 async 非同步函式
  beforeEach(async () => {
    render(<App />);
    const placeholderTextText = screen.getByPlaceholderText(
      "Add somthing......."
    );
    const addbtn = screen.getByText("Add Todo");

    // 模擬使用者輸入的行為
    await userEvent.type(placeholderTextText, "今天記得刷載具");
    // 模擬使用者點擊按鈕的行為
    await userEvent.click(addbtn);
  });
  test("2-1.輸入表單後是否有在畫面上", async () => {
    expect(screen.getByText("今天記得刷載具")).toBeInTheDocument();
  });
  test("2-2.表單輸入後，是否有出現「更多」「編輯」「移除」「完成」的選項", async () => {
    // 先抓「更多」的選項
    const EllipsisBtn = screen.getByLabelText("Ellipsis");
    // 按下「更多」的選項後再抓取其他的元素
    await userEvent.click(EllipsisBtn);

    const editbtn = screen.getByLabelText("edit");
    const removebtn = screen.getByLabelText("remove");
    const checkbtn = screen.getByLabelText("check");
    // 是否有顯示在畫面上
    expect(editbtn).toBeVisible();
    expect(removebtn).toBeVisible();
    expect(checkbtn).toBeVisible();
  });
});
describe("3.測試:表單的「更多選項」行為", () => {
  beforeEach(async () => {
    render(<App />);
    const placeholderTextText = screen.getByPlaceholderText(
      "Add somthing......."
    );
    const addbtn = screen.getByText("Add Todo");
    // 模擬使用者輸入的行為
    await userEvent.type(placeholderTextText, "今天記得刷載具");
    // 模擬使用者點擊按鈕的行為
    await userEvent.click(addbtn);
    // 先抓「更多」的選項
    const EllipsisBtn = screen.getByLabelText("Ellipsis");
    // 按下「更多」的選項後再抓取其他的元素
    await userEvent.click(EllipsisBtn);
  });
  test("3-1.點選刪除後是否不存在於 DOM 中", async () => {
    const removebtn = screen.getByLabelText("remove");
    // 模擬使用者點擊刪除的行為
    await userEvent.click(removebtn);
    // 該條 DOM 元素是否已不再畫面上 (因為有 setTimeout 的設定，所以需使用 waitFor 等待後再查看)
    await waitFor(() => {
      expect(screen.queryByText("今天記得刷載具")).not.toBeInTheDocument();
    });
  });
  test("3-2.勾選完成後是否有新增「ckeck」的 Class Name", async () => {
    const checkbtn = screen.getByLabelText("check");
    // 模擬使用者點擊的行為
    await userEvent.click(checkbtn);
    // 取得該 DOM 元素
    const todoText = screen.getByText("今天記得刷載具");
    // DOM 元素中是否有出現該 check 元素
    expect(todoText).toHaveClass("check");
  });
  test("3-3.編輯後儲存 DOM 元素是否有更新", async () => {
    const editbtn = screen.getByLabelText("edit");
    // 模擬使用者點擊編輯的行為
    await userEvent.click(editbtn);
    // 取得輸入框框
    const placeholderTextText =
      screen.getByPlaceholderText("按下 Enter 自動儲存.....");
    // 模擬使用者輸入表單並按下 Enter
    await userEvent.type(placeholderTextText, "今天已經刷過載具了");
    await userEvent.keyboard("{enter}");
    // DOM 元素中是否有更改後的文字
    expect(screen.getByText("今天已經刷過載具了"));
  });
  test("3-4.儲存時是空格是否有出現錯誤", async () => {
    const editbtn = screen.getByLabelText("edit");
    // 模擬使用者點擊編輯的行為
    await userEvent.click(editbtn);
    // 取得輸入框框
    const placeholderTextText =
      screen.getByPlaceholderText("按下 Enter 自動儲存.....");
    // 模擬使用者輸入表單並按下 Enter
    const cardClass = screen.getByLabelText("card");
    await userEvent.clear(placeholderTextText); // 確認輸入框是空的
    await userEvent.keyboard("{enter}");
    // DOM 元素中是否有出現 error
    expect(cardClass).toHaveClass("error");

    // *error 在 CSS 中設定兩秒後消失，等待兩秒後執行察看確認是否會消失
    await waitFor(
      () => {
        expect(cardClass).not.toHaveClass("error");
      },
      { timeout: 2100 } // 設定最多等待 2.1 秒後檢查
    );
  });
  test("3-5.編輯時是否會自動 focus 到輸入框", async () => {
    const editBtn = screen.getByLabelText("edit");
    await userEvent.click(editBtn);
    const editInput = screen.getByPlaceholderText("按下 Enter 自動儲存.....");
    expect(editInput).toHaveFocus();
  });
  test("3-6.點擊第二次 check 是否會消失", async () => {
    const checkBtn = screen.getByLabelText("check");
    await userEvent.click(checkBtn);
    const cardText = screen.getByLabelText("cardText");
    // 點擊一次之後會出現 check DOM 元素
    await userEvent.click(checkBtn);
    // 點擊第二次 check 會消失
    expect(cardText).not.toHaveClass("check");
  });
  test("3-7.點擊第二次的更多選項後是否會消失", async () => {
    // 找到表單開啟的菜單
    const ellipsisMenu = await screen.findByLabelText("ellipsisMenu");
    const EllipsisBtn = screen.getByLabelText("Ellipsis");
    // 再點一次更多選項的按鈕
    await userEvent.click(EllipsisBtn);
    // 確認已消失在文件上
    expect(ellipsisMenu).not.toBeInTheDocument();
  });
});
describe("4.測試:點選變更顏色後，顏色是否都有變更", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("4-1.新增表單前 card 的變更顏色測試", async () => {
    // 找到變更顏色的按鈕並按下他
    const changeColor = screen.getByLabelText("changeColor");
    await userEvent.click(changeColor);
    // 找到各個元素
    const titleText = screen.getByLabelText("title");
    const placeholderTextText = screen.getByPlaceholderText(
      "Add somthing......."
    );
    const addBtn = screen.getByLabelText("addBtn");

    expect(titleText).toHaveClass("highlight");
    expect(placeholderTextText).toHaveClass("highlight");
    expect(addBtn).toHaveClass("highlight");
  });
  test("4-2.新增表單後 card 的變更顏色測試", async () => {
    // 先新增表單之後點選變更顏色
    const placeholderText = screen.getByPlaceholderText("Add somthing.......");
    // 直接按下 Enter 送出表單
    await userEvent.type(placeholderText, "Hello World {enter}");
    const changeColor = screen.getByLabelText("changeColor");
    await userEvent.click(changeColor);
    // 找到 card 中的各個元素
    const card = await screen.findByLabelText("card");
    const cardText = await screen.findByLabelText("cardText");
    const EllipsisBtn = await screen.findByLabelText("Ellipsis");

    expect(card).toHaveClass("highlight");
    expect(cardText).toHaveClass("highlight");
    expect(EllipsisBtn).toHaveClass("highlight");
  });
});
