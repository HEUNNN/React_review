const DiaryItem = ({ elem }) => {
  console.log("diaryItem test", elem.author);
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {elem.author} | 감정 점수: {elem.emotion} {elem.content}{" "}
          {elem.id} {elem.created_date}
        </span>
      </div>
    </div>
  );
};

export default DiaryItem;
