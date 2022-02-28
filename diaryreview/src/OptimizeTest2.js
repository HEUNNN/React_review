import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A :: Update : ${count}`);
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Counter B :: Update : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
const areEqual = (prevProps, nextProps) => {
  //true 반환: 리렌더링 X
  //false 반환: 리렌더링 O
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>+</button>{" "}
        {/*count값이 동일한 값으로 업데이트됨*/}
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>+</button>
        {/*count값이 동일한 값으로 업데이트됨*/}
      </div>
    </div>
  );
};
export default OptimizeTest2;
