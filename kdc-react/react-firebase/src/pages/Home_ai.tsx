import React, { useEffect, useState } from 'react';
import { Post } from '../components/Post';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authService, db } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface HomeProps {
  userObj: string | null;
}

type PostType = {
  id: string;
  title?: string;
  content: string;
  date: Timestamp;
  userId: string | null;
  userEmail?: string;
  imageUrl?: string;
};

export const Home: React.FC<HomeProps> = ({ userObj }) => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [attachment, setAttachment] = useState<string | null>(null);

  const storage = getStorage();

  // 실시간 게시글 구독
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postArr: PostType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostType[];
      setPosts(postArr);
    });
    return () => unsubscribe();
  }, []);

  // 텍스트 입력
  const newPostInputonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  // 파일 첨부 + 미리보기 + Firebase Storage 업로드 (인증 기반)
  const newPostinputFileonChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const theFile = e.target.files?.[0];
    if (!theFile) return;

    // 로그인 확인
    const user = authService.currentUser;
    if (!user) {
      alert('로그인 후 이미지를 업로드할 수 있습니다.');
      return;
    }

    // 미리보기
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      if (ev.target?.result) {
        setAttachment(ev.target.result as string);
      }
    };
    reader.readAsDataURL(theFile);

    // Firebase Storage 업로드
    try {
      // 파일 이름 공백/특수문자 안전하게 처리
      const safeFileName = encodeURIComponent(theFile.name);
      const storageRef = ref(storage, `uploads/${user.uid}/${safeFileName}`);
      await uploadBytes(storageRef, theFile);
      const url = await getDownloadURL(storageRef);
      setAttachment(url); // Firestore에 저장할 URL
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    }
  };

  // 글쓰기 제출
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post.trim()) return;

    const user = authService.currentUser;
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        date: serverTimestamp(),
        content: post,
        userEmail: user.email,
        userId: userObj,
        imageUrl: attachment || null,
      });
      setPost('');
      setAttachment(null);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <input
          value={post}
          type='text'
          placeholder='새 포스트를 입력하세요'
          onChange={newPostInputonChange}
          style={{ flex: 1 }}
        />
        <input type='file' accept='image/*' onChange={newPostinputFileonChange} />
        <Button type='submit' variant='success'>
          등록
        </Button>
      </form>

      {attachment && (
        <img src={attachment} alt='preview' style={{ maxWidth: '200px', marginBottom: '10px' }} />
      )}

      <hr />
      <h3>Post List</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {posts.map((item) => (
          <Post key={item.id} postObj={item} isOwener={item.userId === userObj} />
        ))}
      </ul>
    </>
  );
};
