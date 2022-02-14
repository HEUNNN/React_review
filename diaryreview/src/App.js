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
  const onDelete = (targetId) => {
    //onDelete를 App.js에서 직접 호출하지 않기에, 지우기를 원하는 요소의 id를 받는 parameter 설정
    //DiaryItem의 '삭제하기' 버튼을 눌렀을때 알 수 있는 해당 list 요소의 id를 onDelete targetId에 전달해주어야한다.
    //따라서 DiaryItem의 부모 요소인 DiaryList에 onDelete를 전달 해줌 = Props Drilling
    const newDiaryList = data.filter((it) => it.id !== targetId); //targetId에 해당하는 요소를 data에서 제거한 newDiaryList 배열 반환
    setData(newDiaryList); //setData()를 통해 data 상태를 변경(갱신)할 수 있음
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryLst={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
