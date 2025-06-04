import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useReducer, useState } from "react";
function App() {
  // 紀錄 todo list 的資料存放狀態（ 會是一個 array ）
  const [data, setData] = useState([]);
  // 紀錄使用者輸入的狀態
  const [input, setInput] = useState("");
  // 存放 React 唯一值 （畫面 Render 也不改變）
  // const idRef = useRef(0);
  return (
    <section className="container">
      {/* Title 的文字（Todo Application） */}
      <section className="title">
        <h1 className="title-text">Todo Application</h1>
      </section>
      {/* Card Components 預計會在這邊更換 */}
      <section className="main">
        <div className="card">
          <div className="card-text">i will wake up on 5 AM</div>
          <button className="remove">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </section>
      {/* 輸入與新增的按鈕 */}
      <section className="add-card">
        <input
          type="text"
          placeholder="Add somthing......."
          className="todo-input"
        />
        <button className="add-btn">Add Todo</button>
      </section>
    </section>
  );
}

export default App;
