import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";
const DiaryList = () => {
  //App.js에서 diaryLst를 props로 넘겨줌, DiaryList에서 map 내장 함수를 사용하여
  //List 형태로 렌더링, 렌더링 될 아이템들을 별도의 component DiaryItem으로 분리하여 작성
  const data = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{data.length}개의 일기가 있습니다.</h4>
      <div>
        {data.map((elem) => (
          //elem을 DiaryItem에 하나씩 보내줌 -> elem이 무엇인지 생각해보기
          //DiaryList가 렌더링 하는 자식은 DiaryItem component 이다.
          <DiaryItem
            key={elem.id}
            //elem={elem}
            {...elem}
          ></DiaryItem>
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  data: [],
};
export default DiaryList;
