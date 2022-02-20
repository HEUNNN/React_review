import React, { useEffect, useState } from "react";
//하나의 파일에 2개 이상의 component 만들어도 됨
const UnmountTest = () => {
  //useEffect를 사용하여 component가 unmount될 때 LifeCycle 관리
  useEffect(() => {
    console.log("Mount!"); //mount 시점에 실행
    return () => {
      //unmount 시점에 실행되는 함수 하나를 return
      console.log("Unmount!");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};
const UnmountLifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>On/Off</button>
      {isVisible && <UnmountTest />}{" "}
      {/* isVisible 이 true 이면, <UnmountTest/> component가 화면에 렌더링
      => 단락회로 평가를 통해서 isVisible이 true냐 false 냐에 따라 뒤의 컴포넌트를 렌더링할지 말지를 결정한다.*/}
    </div>
  );
};

export default UnmountLifeCycle;
