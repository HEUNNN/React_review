import DiaryItem from "./DiaryItem";
const DiaryList = ({ diaryLst }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryLst.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryLst.map((elem) => (
          //elem을 DiaryItem에 하나씩 보내줌 -> elem이 무엇인지 생각해보기
          <DiaryItem elem={elem}></DiaryItem>
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  diaryLst: [],
};
export default DiaryList;
