//Post.tsx 홈(Home.tsx연결)에 포스트입력한 list
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

//nterface는 TypeScript에서 객체의 **모양(shape)**을 정의하는 문법, 데이터가 어떤 속성(property)들을 가지고 있어야 하고, 각 속성의 타입은 무엇인지 미리 약속하는 용도
interface PostProps {
  postObj: {
    date: Timestamp;
    title?: string;
    userEmail?: string;
    userId: string | null; // 🔹 uid 저장 필드
    content: string;
    id: string;
    imageUrl?: string;
  };
  isOwener: boolean;
}

export const Post: React.FC<PostProps> = ({ postObj, isOwener }) => {
  // 글쓰기 삭제 onClick이벤트
  const postDeleteBTNClick = async () => {
    //window에 내장함수 confirm 사용
    const yes = window.confirm('정말 삭제하시겠습니까?');
    if (yes === true) {
      try {
        // 🔹 Firestore에서 해당'posts' 의 문서ID((postObj.id)-Firestore에서 문서는 ID를 기반으로 찾음) 삭제
        await deleteDoc(doc(db, 'posts', postObj.id));
        alert('삭제되었습니다.');
      } catch (error) {
        console.error('에러 발생:', error.message);
      } //or finally {  console.log("마무리 실행");} 으로
    }
  };

  //글쓰기 수정관련 정의및 onClick이벤트
  //글쓰기 수정여부 담기(기본은 닫힘상태)
  const [edit, setEdit] = useState(false);
  //업데이트 내용 정의(기본값은 기존의 값을 불러와야하니 postObj.content(문서의 내용을 쓰기에)로 설정)
  const [newpost, setNewpost] = useState(postObj.content);
  //onClick이벤트
  const newPostEditToggleClick = () => {
    return (
      //setEdit(!edit)를 사용하면 의도치 않게 잘못된 값을 참조할 수 있어 prev를 사용. 이는 동시성(concurrency) 문제를 방지하기 위함
      //prev: setEdit 함수가 실행되는 시점의 현재 edit 상태값을 가리키는 파라미터/ React의 상태 업데이트 함수에 전달하면, 자동으로 이 prev 값을 인자로 넣어줌
      //setEdit(prev => !prev)와 같이 함수형 업데이트를 사용하면 항상 최신 상태값을 기반으로 다음 상태를 계산하기 때문에 더 안전하고 안정적 토글이 가능
      setEdit((prev) => !prev)
    );
  };

  // 수정버튼 누른 후 글쓰기 입력값 관련 <input> 값이 바뀌면 onChange 호출->e.target.value를 구조 분해 할당으로 추출->setNewpost로 상태 업데이트
  //➡ 결과적으로, 입력한 글이 newpost 상태에 실시간 반영
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewpost(e.target.value);
  };

  // 저장 버튼 누른 후 제출 관련
  //1️⃣ 기존방식
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); // 새로고침 방지
    //   if (!newpost.trim()) return; // 공백 입력 방지

    //   console.log('제출할 내용:', newpost);
    //   setNewpost(''); // 제출 후 초기화

    //2️⃣ firebase 데이터추가>문서업데이트에 가져오기
    //글의 참조,문서 참조(post의 reference) 주소 정의 db → Firestore 인스턴스, postObj.id → 문서 ID
    const postRef = doc(db, 'posts', postObj.id);

    // (content: newpost)상태값을 직접 넣어 업데이트(updateDoc)
    await updateDoc(postRef, {
      //posts내의 content필드의 *문자열 값(newPost)*을 넣어야 하기에 newpost로 해야지 상태바꾸는 setNewpost는 안됨
      content: newpost, // 상태값을 직접 넣기
    });

    //본값은 false → 글을 보기 모드로 보여줌 따라서 edit를 false로 바꿔서 보기 모드로 돌아가도록 함
    // 결론:수정 완료 후 상태 초기화 및 보기 모드 전환
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <div style={{ display: 'flex', gap: '5px' }}>
          {/* // 수정 모드 JSX */}
          <form onSubmit={onSubmit}>
            {/* 입력값이 수정되려면 onchange써야함 */}
            <input value={newpost} onChange={onChange} required />
            {/* 수정사항입력후 저장버튼 */}
            <Button type='submit' variant='outline-success' style={{ marginLeft: '5px' }}>
              저장
            </Button>
          </form>
          {/* 전으로 돌아가는 토글이니 아래에 만들어둔 토글newPostEditToggleClick을 활용 */}
          <Button variant='outline-danger' onClick={newPostEditToggleClick}>
            취소
          </Button>
        </div>
      ) : (
        // 보기 모드 JSX
        <li
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            justifyItems: 'center',
            alignItems: 'center',
            gap: '10px',
            width: '500px',
            height: '100px',
            margin: '10px 0',
            borderRadius: '8px',
            backgroundColor: '#ddd',
          }}
        >
          <h4 style={{ width: '340px', margin: '0 10px', whiteSpace: 'pre-wrap' }}>
            {postObj.content}
          </h4>
          {isOwener && (
            <div style={{ display: 'flex', gap: '5px' }}>
              <Button variant='outline-secondary' onClick={postDeleteBTNClick}>
                삭제
              </Button>
              <Button variant='outline-danger' onClick={newPostEditToggleClick}>
                수정
              </Button>
            </div>
          )}
        </li>
      )}
    </>
  );
};
