import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
  const targetId = useRef(0);
  const onCreateLst = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: targetId.current,
    };
    targetId.current += 1; //다음 순번에 저장될 일기 데이터의 아이디 값을 +1 해둠
    setData([newItem, ...data]);
  };
  return (
    <div className="App">
      <DiaryEditor onCreateLst={onCreateLst} />
      <DiaryList diaryLst={data} />
    </div>
  );
}

export default App;
