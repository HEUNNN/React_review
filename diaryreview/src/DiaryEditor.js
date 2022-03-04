import { useRef, useState, useEffect, useContext } from "react";
import React from "react";
import { DiaryDispatchContext } from "./App";
const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    //useState를 사용하기 위한 선언(정의)
    author: "",
    content: "",
    emotion: 1,
  });
  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value, //작성자, 일기 내용 입력창에 입력시 입력창의 변화를 표현하는 코드
    });
  };

  const inputAuthor = useRef(); //DOM요소의 닉네임을 정해주는 것이라고 생각해보기 (=> .getElementById('id'))
  const textareaContent = useRef();
  const handleSubmit = () => {
    if (state.author.length < 1) {
      inputAuthor.current.focus();
      return;
    } else if (state.content.length < 5) {
      textareaContent.current.focus();
      return;
    }
    console.log(state);
    onCreate(state.author, state.content, state.emotion);
    //새로운 일기가 추가되면 App.js의 data 배열에 올리기 위해 App.js로 부터 props 받은 함수를 사용
    //onCreate()안에는 App.js의 stateDate(), 상태 함수가 들어 있어 data 배열에 new 일기를 추가할 수 있음
    alert("저장 성공");
    setState({
      //저장 후 다시 초기화
      author: "",
      content: "",
      emotion: "1",
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleState}
          ref={inputAuthor}
        ></input>
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleState}
          ref={textareaContent}
        />
      </div>
      <div>
        <select name="emotion" value={state.emotion} onChange={handleState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
