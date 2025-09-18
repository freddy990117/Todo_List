import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPalette,
  faPencil,
  faCheck,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

function App() {
  // 紀錄 todo list 的資料存放狀態（ 會是一個 array ）
  const [data, setData] = useState([]);
  // 紀錄使用者輸入的狀態
  const [inputValue, setInputValue] = useState("");
  // 存放 React 唯一值 （畫面 Render 也不改變）
  const idRef = useRef(0);
  // 存放 輸入 的唯一值
  const inputRef = useRef(null);
  // 存放 變更顏色 的狀態
  const [changeColor, setChangeColor] = useState(false);
  // 存放 背景顏色的 DOM 元素
  const [highlight, setHighlight] = useState(false);
  // JSX 無法辨識到 body DOM，所以使用 JS 的方式找到 body 的元素並賦值
  useEffect(() => {
    document.body.classList.toggle("highlight", highlight);
  }, [highlight]);
  // 存放 識別ID 的狀態，預設無狀態 （點選編輯的按鈕時觸發）
  const [editID, setEditID] = useState(null);
  // 存放 編輯後的文字 狀態 （點選編輯的按鈕時觸發）
  const [editText, setEditText] = useState("");
  // 存放 完成 的狀態
  const [check, setCheck] = useState([]);
  // 存放 點擊表單後開啟 的狀態
  const [ellipsis, setShowEllipsis] = useState(null);
  // 存放 點選表單 的狀態
  const show = false;
  // 設定 新增 Todo List 的 function
  const addFun = () => {
    // 如果 inputValue 是空值的話，返回空值
    if (inputValue === "") return "";

    const todoData = {
      // id 設定不會改變的 useRef 值
      id: idRef.current++,
      // 值是使用者輸入的資訊
      text: inputValue,
      // 是否完成
      isComplete: false,
    };
    // 展開原有的 data，新增使用者輸入的資訊
    setData([...data, todoData]);

    // 輸入後清除 input 欄位中的內容
    setInputValue("");
  };

  // 偵測鍵盤的行為，當按下 Enter 時執行
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addFun();
  };

  // 移除行為 (依照 id 來移除 DOM 元素)
  const removeCard = (id) => {
    // 過濾 id，如果 id 沒有被點擊，則加入 data 中 (不使用 splice 是因為改的會是原資料，React 無法正確偵測畫面是否需要更新 (直接改 data 的值，所以不會重新渲染))
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  // 設定按下編輯按鈕時，自動跳到輸入框 (不用在自己點))
  useEffect(() => {
    if (editID !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editID]);

  return (
    <section className={"container"}>
      {/* Title 的文字（Todo Application） */}
      <section className="title">
        <h1 className={`title-text${changeColor ? "highlight" : ""}`}>
          Todo Application
        </h1>
      </section>
      {/* Card Components  */}
      <section className="main">
        {data.map((todo) => (
          <div
            // Card 的邊框
            className={`card${changeColor ? "highlight" : ""}`}
            key={todo.id}
          >
            {/* 如果 ID 相符的話，就執行更改的邏輯 */}
            {editID === todo.id ? (
              <input
                id={todo.id}
                className="input"
                //內容是綁定 div 中的文字
                value={editText}
                // 改變的文字榜定到 editText 中狀態
                onChange={(e) => setEditText(e.target.value)}
                // 偵測鍵盤的行為，當按下 Enter 時儲存編輯內容，並更新對應的 todo
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // 建立一個新的 array，透過 map 對每一比資料比對
                    const updateEdit = data.map((item) =>
                      // 如果 item.id 與正在編輯的 todo.id 相同的話，就用編輯後的內容取代原本的文字
                      item.id === todo.id ? { ...item, text: editText } : item
                    );
                    // 將資料返回初始值，並回傳資料給 Data
                    setEditText("");
                    setEditID(null);
                    setData(updateEdit);
                    setCheck("");
                  }
                }}
                // 綁定 ref 狀態
                ref={inputRef}
                placeholder="按下 Enter 自動儲存....."
              />
            ) : (
              // ID 沒有相符的話，就不會更改其內容
              <div
                // Card 內文的設定
                className={`card-text ${changeColor ? "highlight" : ""} ${
                  // check 狀態中是否有包含 todo.id，有則回傳 "check"，沒有則是空白
                  check.includes(todo.id) ? "check" : ""
                }`}
                onChange={() => {
                  setEditText(todo.text);
                }}
              >
                {todo.text}
              </div>
            )}

            {/* 延伸項目的按鍵，點選後開啟延伸項目*/}
            <button
              className={`Ellipsis ${changeColor ? "highlight" : ""}`}
              onClick={() => {
                // 控制表單的開啟，如果 === 表單的 id 則開啟，如果已有，則關閉。
                setShowEllipsis((prev) => (prev === todo.id ? null : todo.id));
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>

            {/* 當 todo.id === 目前要顯示的 ellipsis 的表單時，才會渲染版單 */}
            {ellipsis === todo.id && (
              <div className={`ellipsisMenu ${show ? "show" : ""}`}>
                {/* 編輯按鈕 */}
                <button
                  onClick={() => {
                    setEditID(todo.id);
                    setShowEllipsis(false);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                {/* 勾選按鈕 */}

                <button
                  onClick={() => {
                    setCheck((prev) =>
                      // 檢查目前的 check 清單中，是否已經包含被點擊的這一筆 todo.id
                      prev.includes(todo.id)
                        ? // 如果有：代表使用者是在取消勾選
                          prev.filter((id) => id !== todo.id)
                        : // 如果沒有：代表使用者要勾選這一筆, 把 todo.id 加入到 check 陣列中，並回傳新的陣列
                          [...prev, todo.id]
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                {/* 刪除按鈕 */}

                <button
                  onClick={() => {
                    removeCard(todo.id);
                    setShowEllipsis(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      {/* 輸入與新增的按鈕 */}
      <section className="add-card">
        <input
          type="text"
          placeholder="Add somthing......."
          className={`todo-input ${changeColor ? "highlight" : ""}`}
          // 綁定 value 的值是使用者輸入的值
          value={inputValue}
          // 設定監聽事件，追蹤 inputValue
          onChange={(e) => setInputValue(e.target.value)}
          // 監測鍵盤的輸入
          onKeyDown={handleKeyDown}
        />
        {/* Add todo button */}
        <button
          className={`add-btn ${changeColor ? "highlight" : ""}`}
          onClick={addFun}
        >
          Add Todo
        </button>
      </section>
      {/* 轉換顏色的按鈕 */}
      <button
        className={`changeColor ${changeColor ? "highlight" : ""}`}
        onClick={() => {
          setHighlight((prev) => !prev);
          setChangeColor((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faPalette} />
      </button>
    </section>
  );
}

export default App;
