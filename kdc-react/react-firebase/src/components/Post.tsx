//Post.tsx 홈(Home.tsx연결)에 포스트입력한 list
import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PostProps {
  postObj: string; // 또는 postObj가 객체라면 { id: string, post: string } 등으로 지정
}

export const Post: React.FC<PostProps> = ({ postObj }) => (
  <li style={{display:'flex' , justifyItems:'center', gap:'10px'}}>
    {/* 그 글을 수정, 삭제 권한 해당 아이디에게 부여 */}
    <h4 style={{width:'300px'}}>{postObj}</h4>
    <Button variant='outline-secondary' >
      삭제
    </Button>
    <Button variant='outline-danger' >
      수정
    </Button>
  </li>
);
