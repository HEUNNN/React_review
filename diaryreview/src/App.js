import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]); //데이터를 관리할 state(최상단에 위치)
  const dataId = useRef(0); //id 값을 0 으로 정의(초기값)

  //JSON Placeholder에서 데이터를 받아올 것이다. = React에서 API 호출
  const getData = async () => {
    //async를 붙여서 getData가 promise 객체를 반환하도록 한다.
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((elem) => {
      return {
        author: elem.email,
        content: elem.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++, //return 되니까 후위 연산자 사용
      };
    });
    setData(initData);
  };
  useEffect(() => {
    getData();
  }, []);
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
  //무엇을 수정할지 모르고 그저 props해주기 때문에 targetId parameter 필요
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((elem) =>
        elem.id === targetId ? { ...elem, content: newContent } : elem
      )
      //elem.id !== targetId 이면 그냥 elem을 반환,
      //elem.id === targetId 이면, 수정된 content로 교체된 elem을 setDate()에 전달해주어서 data 상태를 변화시킴
    );
  };
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작", data);
    const goodCount = data.filter((v) => v.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 객체로 반환되는 결괏값을 비구조화 할당으로 받는다.
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 수: {data.length}</div>
      <div>기분 좋은 일기 수: {goodCount}</div>
      <div>기분 나쁜 일기 수: {badCount}</div>
      <div>기분 좋은 일기의 비율: {goodRatio} %</div>
      <DiaryList data={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
