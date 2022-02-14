import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]); //데이터를 관리할 state(최상단에 위치)
  const dataId = useRef(0); //id 값을 0 으로 정의(초기값)
  //기존의 일기 배열에 새로운 일기를 추가하는 함수: onCreate
  const onCreate = (author, content, emotion) => {
    //새로운 데이터를 받아올 parameter
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; //추가될 데이터의 id 값이 1씩 증가됨
    setData([newItem, ...data]);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryLst={data} />
    </div>
  );
}

export default App;
