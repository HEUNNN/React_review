import { useRef, useState } from "react";
const DiaryEditor = ({ onCreateLst }) => {
  const [state, setState] = useState({
    //useState를 사용하기 위한 선언(정의)
    author: "",
    content: "",
    emotion: 1,
  });
  const handleState = (e) => {
    const { name, value } = e.target; //비구조화
    setState({
      ...state,
      [name]: value, //useState({}) 내부의 객체 author, content, emotion 값을 최신화 해줌
    });
  };

  const inputAuthor = useRef();
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
    onCreateLst(state.author, state.content, state.emotion);
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
export default DiaryEditor;
