import React, { useEffect, useState } from "react";

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //useEffect를 사용하여 mount시 LifeCycle 관리
  useEffect(() => {
    console.log("Mount!");
  }, []); //useEffect()에 빈 배열을 전달하면 Mount 때만 LifeCycle 관리 => rerendering 될 때는 Mount!가 콘솔에 출력되지 않음

  //useEffect를 사용하여 Rendering(Update) 시 LifeCycle 관리
  useEffect(() => {
    console.log("Update!"); //input 내용이 생기거나, count + 1 될때, Update가 콘솔에 출력됨
  });

  //useEffect를 사용하여 count의 state가 변화하는 순간의 LifeCycle 관리
  useEffect(() => {
    console.log("Count State is Update!", [count]);
  });

  //useEffect를 사용하여 text의 state가 변화하는 순간의 LifeCycle 관리
  useEffect(() => {
    console.log("Text State is Update!", [text]);
  });
  //Dependency Array를 잘 활용하면 원하는 값만 감지해서 변화하는 순간을 포착하여 callback 함수를 동작하도록 할 수 있다.
  // 예) count state 가 5를 넘어가면 경고창을 띄우는 callback 함수 등을 적용하는 경우
  useEffect(() => {
    if (count > 5) {
      alert(`${count}가 5를 넘었습니다. 1로 초기화 합니다.`);
      setCount(1);
    }
  });
  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default LifeCycle;
