// Home.tsx 로그인후 페이지 보여주며 입력글을 firebase에 자동 저장되게 함 (규칙에서 if faulse를 if true로 바꿈)
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authService, db } from '../firebase';
//데이터 추가 : 1. collection, addDoc:문서 추가 2.serverTimestamp: 서버 타임스탬프(문서전송시간:자동정렬됨) / 데이터 읽기: 1getDocs :모든문서 가져오기
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

export const Home: React.FC = () => {
  // 인풋입력값저장을 위한 정의
  const [post, setPost] = useState('');
  // 인풋입력된 내용과 설정된 부분 파이어베이스에 저장된 내용 넣을 공간 정의
  const [posts, setPosts] = useState([]); //빈배열이더라도 여러개가 들어오니 []씀

  //await 은async 비동기 함수가 필요한데 이게 없으면 순서대로 작동하지 못하게됨(그냥 동기화되어 처음에는 빈배열이 있지 않고 둘다 배열이 차있었을 것임)
  const getPosts = async () => {
    //실시간을 원하면 onSnapshot 사용
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsArray: any[] = []; // 임시 배열

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
      // 입력한 내용및 설정데이터 나오게 함
      const postObj = {
        ...doc.data(), // 원래 내용을 풀어헤침
        id: doc.id, // 고유 아이디를 id에 넣어주기
      };
      postsArray.push(postObj);
    });
    // 입력한 내용postObj을 posts에 변경해주기 setPosts사용
    // postsArray 전체를 setPosts로 넣기
    setPosts(postsArray);
  };
  //생명주기함수  useEffect로 getPosts가 한번 나오게 설정(useEffect이 Effect를 언제 실행할지"를 제어하는 역할)
  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);

  // onChange이벤트 입력값이 있으미 e매개변수 사용
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값 변경
    setPost(e.target.value);
  };

  // onSubmit  제출 이벤트 에러 확인하기 위해 try catch함수 이용
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    e.preventDefault();

    if (!post.trim()) return; // 공백 입력 방지

    // 로그인 체크
    const user = authService.currentUser;
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    // 에러 거르기
    try {
      // 새로운 문서 추가 posts 컬렉션에 id 문서 내용은 적은부분다/ await은 비동기 함수 async와 함께 써야하므로 맨앞 async(e:xxx)를 씀
      const docRef = await addDoc(collection(db, 'posts'), {
        //문서에 입력되는 설정된 내용
        date: serverTimestamp(), //서버 업데이트 수신 시점을 추적하는 서버 타임스탬프로 설정 위에 import하고 글을 입력되는 시간 자동붙는 함수 붙임
        post, //입력값
        userEmail: user.email, // 이메일 기록
        userId: user.uid, // 글 작성자 UID 기록
      });
      console.log('Document written with ID: ', docRef.id); //정의 내려진 변수에 id는 자동생성

      // 제출 후 입력 초기화 이거하지 않으면 input의 value가 그대로 남아 쓴글이 남아있음
      setPost('');

      // 새 글 추가 후 목록 갱신
      getPosts(); // 또는 실시간으로 하려면 onSnapshot 사용

      // onSubmit 안 → 새 글 추가할 때: setPosts(prev => [postObj, ...prev]) 써야함
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* value= onchage이벤트로 변경된 value를 받아옴 onChange는 인풋값이 변하면 할일을 담는 이벤트 */}
        <input value={post} type='text' placeholder='새 포스트를 입력하세요' onChange={onChange} />
        <Button type='submit' variant='success'>
          등록
        </Button>
      </form>
      {/* 입력한 목록출력 */}
      <hr/>
      <ul>
        {/* 스크립트를 사용하여 불러와 작성 */}
        {
          posts.map((item) => (
            //반복문이라 key값이 꼭 필요함
            <li key={item.id}>{item.post}</li>
          ))
        }
      </ul>
    </>
  );
};
