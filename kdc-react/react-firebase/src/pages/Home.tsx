// Home.tsx 로그인후 페이지 보여주며 입력글을 firebase에 자동 저장되게 함 (규칙에서 if faulse를 if true로 바꿈)
import React, { useEffect, useState } from 'react';
import { Post } from '../components/Post';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authService, db } from '../firebase';
//데이터 추가 : 1. collection, addDoc:문서 추가 2.serverTimestamp: 서버 타임스탬프(문서전송시간:자동정렬됨) / 데이터 읽기: 1getDocs :모든문서 가져오기
import {
  collection,
  addDoc,
  serverTimestamp,
  // getDocs, //getDocs 는 한 번만 데이터를 가져옴
  orderBy, // 쿼리 결과를 특정 필드 기준으로 정렬할 때 사용 orderBy("date", "desc") // date 필드 기준으로 내림차순 정렬
  query, //컬렉션에서 조건, 정렬 등을 결합한 쿼리를 생성할 시/  단순히 getDocs(collection(db, "posts")) 만 하면 전체 컬렉션 조회 조건/정렬 넣으려면 query 필요
  onSnapshot,
  Timestamp, //onSnapshot 은 데이터가 바뀔 때마다 자동 호출 → 채팅, 실시간 글 목록, 알림 등에 유용
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
interface HomeProps {
  userObj: string | null;
}
//TypeScript 타입 지정 doc.data() 는 기본적으로 DocumentData 타입이에요. doc.id 는 string.
type Post = {
  id: string;
  title: string;
  content: string;
  date: Timestamp; // Timestamp라면 Firebase Timestamp 타입 써야 함
  userId: string | null; // 🔹 uid 저장 필드
  userEmail?: string; // 선택적으로 이메일도
};

export const Home: React.FC<HomeProps> = ({ userObj }) => {
  // 인풋입력값저장을 위한 정의
  const [post, setPost] = useState('');
  // 인풋입력된 내용과 설정된 부분 파이어베이스에 저장된 내용 넣을 공간 정의
  const [posts, setPosts] = useState<Post[]>([]); //빈배열이더라도 여러개가 들어오니 []씀

  //getPosts 한 번만 데이터를 가져옴
  //await 은async 비동기 함수가 필요한데 이게 없으면 순서대로 작동하지 못하게됨(그냥 동기화되어 처음에는 빈배열이 있지 않고 둘다 배열이 차있었을 것임)
  // const getPosts = async () => {
  //   //실시간을 원하면 onSnapshot 사용
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
  //   const postsArray: any[] = []; // 임시 배열

  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.data());
  //     // 입력한 내용및 설정데이터 나오게 함
  //     const postObj = {
  //       ...doc.data(), // 원래 내용을 풀어헤침
  //       id: doc.id, // 고유 아이디를 id에 넣어주기
  //     };
  //     postsArray.push(postObj);
  //   });
  //   // 입력한 내용postObj을 posts에 변경해주기 setPosts사용
  //   // postsArray 전체를 setPosts로 넣기
  //   setPosts(postsArray);
  // };
  //생명주기함수  useEffect로 getPosts가 한번 나오게 설정(useEffect이 Effect를 언제 실행할지"를 제어하는 역할)

  // onSnapshot 은 데이터가 바뀔 때마다 자동 호출 → 채팅, 실시간 글 목록, 알림 등에 유용
  useEffect(() => {
    // getPosts();  // (주석처리된 함수, 원래는 DB에서 글 불러오기)

    // 1) 'posts'라는 컬렉션을 불러오고 'date' 필드 기준으로 내림차순 정렬 쿼리 만듦
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));

    // 2) q 쿼리를 실시간 구독(onSnapshot) → Firestore가 변동될 때마다 자동으로 실행됨
    // 구독 시작
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot);//은 배열영이 아니고 doc안에 배력이 있어
      // 3) snapshot 안에 들어있는 문서들을 순회중 forEach/ map  ....map 사용
      //forEach 목적: 배열을 단순히 순회하면서 부수효과(side effect) 실행.반환값: 항상 undefined +추가하는 과정도 추가로 넣어줘야함 [1,2,3] consolog(2) =>2만나옴
      // 즉, 새로운 배열을 만들지 않고 그냥 "돌면서 뭔가 하기" 용도.
      //map 목적: 배열을 순회하면서 각 요소를 변환한 새 배열을 생성.반환값: 변환된 값들로 이루어진 새 배열.원본 배열은 수정되지 않음. [12-,2,3] *2 =>[2,4,6]
      //Firestore의 QuerySnapshot 객체라 querySnapshot.docs (배열)을 써야함. querySnapshot.docs.map((doc)로 써야함<->push하면 그대로 써도됨
      const postArr: Post[] = querySnapshot.docs.map((doc) => ({
        // 객체 리터럴(doc)을 반환하려면 반드시 중괄호 {} 필요합니다.
        // doc.data() 로 문서 내용 접근 가능
        // doc.id 로 문서 ID 접근 가능(객체 형태로 나오니 중괄호 필요)
        ...doc.data(), // 원래 내용을 풀어헤침
        id: doc.id,
      })) as Post[];
      setPosts(postArr);

      // ❌ 이 부분은 현재 잘못된 예시 (cities라는 변수가 없음)
      console.log('Current cities in CA: ', postArr.map((p) => p.title).join(', '));
    });
    // cleanup 함수에서 구독 해제
    return () => unsubscribe();
  }, []); // ✅ 빈 배열 넣으면 마운트 시 1번만 실행

  console.log(posts);

  //Firebase Storage에서 가져오는 URL은 string이므로, 타입 안전하게 설정해야 함
  const [attachment, setAttachment] = useState<string | null>(null);

  // 1️⃣새post(글쓰기) 이름부분 onChange이벤트 입력값이 있으미 e매개변수 사용
  // 파이어베이스 저장 담아두기
  const storage = getStorage();
  //onChange이벤트 입력값이 있으미 e매개변수 사용
  const newPostInputonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 새포스트 이름 입력값 직접입력
    setPost(e.target.value);
  };

  //2️⃣ 이미지등 파일업로드 onChange
  const newPostinputFileonChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    //해당파일정보 바로보기 가능
    const theFile = e.target.files?.[0]; //?.해서 파일이 없으면 undefined가 되고, 있으면 첫 번째 파일이 들어옴.
    // console.log(theFile);

    // 파일이 없으면 함수를 멈추어 이후 코드가 실행되지 않게 함.
    if (!theFile) return;

    // 2️⃣.1️⃣파일 미리보기용 브라우저 내장 FileReader 인스턴스 생성. 파일을 비동기적으로 읽는 도구.
    // 파일을 읽는 도구(객체)를 하나 새로 만들어(다음 → reader.readAsDataURL(file) 같은 메서드를 호출해서 파일을 읽고, reader.result에 결과를 담기)
    const reader = new FileReader();

    // 🥇파일 읽기 완료 후 실행 파일 읽기가 완료(load 끝) 되었을 때 호출되는 핸들러(onloadend는 성공·실패 상관없이 끝났을 때 호출).
    reader.onloadend = (ev) => {
      console.log('읽기 완료:', reader.result); // 읽은 결과(여기서는 readAsDataURL 사용으로 base64 데이터 URL)가 듦
      console.log('이벤트 객체:', e);
      if (ev.target?.result) {
        setAttachment(ev.target.result as string); // Base64 문자열 저장
      }
    };

    // 🥈파일 읽기 시작 (base64 data URL로 변환). 이 호출이 있어야 onloadend가 트리거됨
    reader.readAsDataURL(theFile);
    console.log(attachment);

    // 2️⃣.2️⃣실제 업로드는 Firebase Storage에 원본 파일을 전송
    try {
      const storageRef = ref(storage, `uploads/${theFile.name}`);
      await uploadBytes(storageRef, theFile);

      // 업로드된 파일의 URL 가져오기
      const url = await getDownloadURL(storageRef);
      console.log('Uploaded file URL:', url);

      // Firestore에는 이 url만 저장하는 게 안전
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    }
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
        content: post, // post입력값을 content필드에 담기
        userEmail: user.email, // 이메일 기록
        userId: userObj, // 글 작성자 UID 기록
      });
      console.log('Document written with ID: ', docRef.id); //정의 내려진 변수에 id는 자동생성

      // 제출 후 입력 초기화 이거하지 않으면 input의 value가 그대로 남아 쓴글이 남아있음
      setPost('');

      // 새 글 추가 후 목록 갱신
      // getPosts(); // 또는 실시간으로 하려면 onSnapshot 사용

      // onSubmit 안 → 새 글 추가할 때: setPosts(prev => [postObj, ...prev]) 써야함
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  //이미지 업로드취소
const uploadCancelBtnClick = () => {
  setAttachment(null);
};

  return (
    <>
      <div style={{ display: 'flex' }}>
        <form onSubmit={onSubmit}>
          {/* value= onchage이벤트로 변경된 value를 받아옴 onChange는 인풋값이 변하면 할일을 담는 이벤트 */}
          <input
            value={post}
            type='text'
            placeholder='새 포스트를 입력하세요'
            onChange={newPostInputonChange}
          />

          {/* 이미지등 파일업로드 type="file" 파일등록 해야하니 꼭 필요/파일첨부accept 이미지파일만/ 미리보기도 가능하게*/}
          <input type='file' accept='image/*' onChange={newPostinputFileonChange} />
        </form>

        {/* 글쓰기 등록 */}
        <Button type='submit' variant='success' style={{ marginLeft: '5px' }}>
          등록
        </Button>
      </div>
      {/* 미리보기 */}
      {attachment && (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <img src={attachment} width='100px' alt='' />
          <Button
            type='submit'
            variant='outline-danger'
            style={{ height: '40px' }}
            onClick={uploadCancelBtnClick}
          >
            업로드 취소
          </Button>
        </div>
      )}

      {/* 입력한 목록출력 */}
      <hr />
      <h3>Post List</h3>
      <ul style={{ padding: '0' }}>
        {/* 스크립트를 사용하여 불러와 작성 */}
        {posts.map((item) => (
          //반복문이라 key값이 꼭 필요함 <li key={item.id}>{item.post}</li>
          //컴포넌트로 분리// uid 글쓴사람인지 확인차 true/false 필요
          //isOwener는item.userId === userObj → 현재 로그인한 사용자가 글 작성자(userId)와 같으면 true, 아니면 false
          //삭제/수정 버튼이 글 작성자에게만 보여지는 것이 바로 이 로직
          <Post key={item.id} postObj={item} isOwener={item.userId === userObj} />
        ))}
      </ul>
    </>
  );
};
