import React, { useRef, useState, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  //elem을 받아와서 elem은 객체라서 elem.content 등으로 사용해도 됨
  //DiaryList가 렌더링 하는 자식은 DiaryItem component 이다.
  /*가독성을 위해서 return에서 밖으로 빼내어 handleDelete 함수로 선언하여 사용*/

  const { onDelete, onEdit } = useContext(DiaryDispatchContext);

  useEffect(() => {
    console.log(`${id}(id) item is rendering. `);
  });
  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };

  const [isEdit, setIsEdit] = useState(false); //isEdit의 초기 상태를 false로 설정
  const toggleIsEdit = () => {
    setIsEdit(!isEdit); //isEdit의 상태값을 반전 시켜서 setIsEdit을 통해 isEdit의 상태를 변경한다. = toggle
  };
  //수정 form인 textArea도 DiaryEditor 처럼 글 작성시 textArea에 적용되도록 해주어야 함
  const [editTextArea, setEditTextArea] = useState(content);
  const handleEditTextArea = (e) => {
    setEditTextArea(e.target.value);
  };
  const handleQuitEdit = () => {
    setIsEdit(!isEdit); //수정하다가 수정 취소를 누르면, 수정하던 내용은 없어지고 content 내용만 다시 수정 form에 남는다
    setEditTextArea(content);
  };
  const editTextAreaRef = useRef();
  const handleEditConfirm = () => {
    if (editTextArea.length < 5) {
      editTextAreaRef.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, editTextArea);
      setIsEdit(!isEdit);
      //toggleIsEdit(); 사용해도 똑같은 결과
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="userInfo">
          작성자: {author} | 감정 점수: {emotion}
        </span>
        <br />
        <span className="date">
          작성 시간:{new Date(created_date).toLocaleString()}
        </span>
      </div>
      {/* new Data()객체에 ms 단위인 created_date를 넣으면 ms 시간을 기준으로 Date() 객체가 생성이 된다.
          Date() 객체를 생성한 이유는 .toLocaleString을 사용하기 위함 => 사람이 알아보기 좋은 숫자로 변경해줌
      */}
      <br />
      <div className="content">
        {isEdit === false ? (
          <>{content}</>
        ) : (
          <>
            <textarea
              value={editTextArea}
              onChange={handleEditTextArea}
              ref={editTextAreaRef}
            />
          </>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEditConfirm}>수정 확인</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
