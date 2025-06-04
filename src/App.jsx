import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useReducer, useState } from "react";
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
  };

  return (
    <section className="container">
      {/* Title 的文字（Todo Application） */}
      <section className="title">
        <h1 className="title-text">Todo Application</h1>
      </section>
      {/* Card Components 預計會在這邊更換 */}
      <section className="main">
        {data.map((todo) => (
          <div className="card">
            <div className="card-text" key={todo.id}>
              {todo.text}
            </div>
            <button className="remove">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        {/* 
        <div className="card">
          <div className="card-text">i will wake up on 5 AM</div>
          <button className="remove">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div> */}
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
        />
        <button className="add-btn" onClick={addFun}>
          Add Todo
        </button>
      </section>
    </section>
  );
}

export default App;
