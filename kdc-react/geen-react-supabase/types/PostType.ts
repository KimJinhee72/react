// 게시글 데이터 타입
export interface PostType {
  id: string;
  content: string;
  image_url?: string;
  user_id: string;
  user_email?: string;
  created_at: string;
}

// Post 컴포넌트 prop 타입
export interface PostProps {
  postObj: {
    id: string;
    content: string;
    image_url?: string; // 이미지가 있을 수도 있음
    user_id: string; // 작성자 ID
    user_email?: string; // 작성자 이메일 (선택)
    created_at: string; // 생성 시각
  };
  isOwner: boolean; // 현재 로그인 유저가 작성자인지 여부
  currentUserId: string | null; // 현재 로그인한 유저 ID
  onUpdate?: (updatedPost: PostType) => void; // 부모 상태 갱신용, 수정 후
  onDelete?: (id: string) => void; // 부모 상태 갱신용, 삭제 후
}
