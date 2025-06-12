import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPalette,
  faPencil,
  faCheck,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, use } from "react";

function App() {
  // 紀錄 todo list 的資料存放狀態（ 會是一個 array ）
  const [data, setData] = useState([]);
  // 紀錄使用者輸入的狀態
  const [inputValue, setInputValue] = useState("");
  // 存放 React 唯一值 （畫面 Render 也不改變）
  const idRef = useRef(0);
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
  const [check, setCheck] = useState(null);
  // 存放 移除 的狀態
  const [remove, setRemove] = useState();
  // 存放 點擊表單後開啟 的狀態
  const [ellipsis, setShowEllipsis] = useState(null);
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
    // 過濾 id，如果 id 沒有被點擊，則加入 data 中 (不使用 splice 室因為改的是原資料，React 無法正確偵測畫面是否需要更新 (直接改 data 的值，所以不會重新渲染))
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <section className={"container"}>
      {/* Title 的文字（Todo Application） */}
      <section className="title">
        <h1 className={`title-text ${changeColor ? "highlight" : ""}`}>
          Todo Application
        </h1>
      </section>
      {/* Card Components 預計會在這邊更換 */}
      <section className="main">
        {data.map((todo) => (
          <div
            className={`card ${changeColor ? "highlight" : ""}`}
            key={todo.id}
          >
            <div className={`card-text ${changeColor ? "highlight" : ""}`}>
              {todo.text}
            </div>
            <button
              className={`Ellipsis ${changeColor ? "highlight" : ""}`}
              onClick={() => {
                setShowEllipsis(todo.id);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            {ellipsis === todo.id && (
              <div className="ellipsisMenu show">
                <button>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  onClick={() => {
                    setCheck(check(true));
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={() => {
                    setRemove(remove(true));
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
