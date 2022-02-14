const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onDelete,
}) => {
  //DiaryList가 렌더링 하는 자식은 DiaryItem component 이다.
  return (
    <div className="DiaryItem">
      <span>
        작성자: {author} | 감정 점수: {emotion}
      </span>
      <span className="data">{new Date(created_date).toLocaleString}</span>
      {/* new Data()객체에 ms 단위인 created_date를 넣으면 ms 시간을 기준으로 Date() 객체가 생성이 된다.
          Date() 객체를 생성한 이유는 .toLocaleString을 사용하기 위함 => 사람이 알아보기 좋은 숫자로 변경해줌
      */}
      <br />
      <div className="content">{content}</div>
      <button
        onClick={() => {
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id); //onDelete에 해당 id를 전달
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;
