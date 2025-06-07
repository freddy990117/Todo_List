import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";

function App() {
  // 紀錄 todo list 的資料存放狀態（ 會是一個 array ）
  const [data, setData] = useState([]);
  // 紀錄使用者輸入的狀態
  const [inputValue, setInputValue] = useState("");
  // 存放 React 唯一值 （畫面 Render 也不改變）
  const idRef = useRef(0);

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
    setInputValue("")
  };

  // 偵測鍵盤的行為，當按下 Enter 時執行
  const handleKeyDown = (e)=>{
    if (e.key === "Enter")
      addFun();
  }

  return (
    <section className="container">
      {/* Title 的文字（Todo Application） */}
      <section className="title">
        <h1 className="title-text">Todo Application</h1>
      </section>
      {/* Card Components 預計會在這邊更換 */}
      <section className="main">
        {data.map((todo) => (
          <div className="card" key={todo.id}>
            <div className="card-text" >
              {todo.text}
            </div>
            <button className="remove">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
   
      </section>
      {/* 輸入與新增的按鈕 */}
      <section className="add-card">
        <input
          type="text"
          placeholder="Add somthing......."
          className="todo-input"
          // 綁定 value 的值是使用者輸入的值
          value={inputValue}
          // 設定監聽事件，追蹤 inputValue
          onChange={(e) => setInputValue(e.target.value)}
          // 監測鍵盤的輸入
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addFun} >
          Add Todo
        </button>
      </section>
    </section>
  );
}

export default App;
