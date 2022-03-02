import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
const dataReducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; // 현재 state 업데이트
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, // ... 은 펼쳐서 놓기
        created_date,
      };
      return [newItem, ...state];
    }
    case "DELETE": {
      const deleteData = state.filter((it) => it.id !== action.data);
      return deleteData;
    }
    case "EDIT": {
      const editData = state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
      return editData;
    }
    default:
      return state;
  }
};

function App() {
  //const [data, setData] = useState([]); //데이터를 관리할 state(최상단에 위치)
  const [data, dispatch] = useReducer(dataReducer, []);
  const dataId = useRef(0); //id 값을 0 으로 정의(초기값)

  //JSON Placeholder에서 데이터를 받아올 것이다. = React에서 API 호출
  const getData = async () => {
    //init action
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
    dispatch({ type: "INIT", data: initData });
  };
  useEffect(() => {
    // 처음 mount 될 때 getDate() 호출
    getData();
  }, []);
  //기존의 일기 배열에 새로운 일기를 추가하는 함수: onCreate
  const onCreate = useCallback((author, content, emotion) => {
    //create action
    //새로운 데이터를 받아올 parameter
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current }, //creared_date는 리듀서에서 만들예정
    });
    dataId.current += 1; //추가될 데이터의 id 값이 1씩 증가됨
  }, []);
  const onDelete = useCallback((targetId) => {
    // delete action
    dispatch({ type: "DELETE", data: targetId });
  }, []);
  //무엇을 수정할지 모르고 그저 props해주기 때문에 targetId parameter 필요
  const onEdit = useCallback((targetId, newContent) => {
    //edit action
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);
  const getDiaryAnalysis = useMemo(() => {
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
