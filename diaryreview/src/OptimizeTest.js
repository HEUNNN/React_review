import React, { useState, useEffect } from "react";
const Textview = React.memo(({ text }) => {
  //OptimizeTest 컴포넌트의 자식 컴포넌트
  useEffect(() => {
    // 리렌더링이 일어났을때, props 변화를 알아보기 위해 useEffect 사용
    console.log(`Update :: test : ${text}`);
  });
  return <div>{text}</div>;
});
const Countview = React.memo(({ count }) => {
  //OptimizeTest 컴포넌트의 자식 컴포넌트
  useEffect(() => {
    // 리렌더링이 일어났을때, props 변화를 알아보기 위해 useEffect 사용
    console.log(`Update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  //optimize 실습용
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
      </div>
    </div>
  );
};
export default OptimizeTest;
