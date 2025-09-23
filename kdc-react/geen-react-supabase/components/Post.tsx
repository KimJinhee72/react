'use client';

import type React from 'react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface PostData {
  id: string;
  content: string;
  image_url?: string;
  user_id: string;
  user_email?: string;
  created_at: string;
  updated_at?: string;
}

interface PostProps {
  postObj: PostData;
  isOwner: boolean;
  currentUser: any;
  onUpdate?: (updatedPost: PostData) => void;
  onDelete?: (id: string) => void;
}

export default function Post({ postObj, isOwner, currentUser, onUpdate, onDelete }: PostProps) {
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(postObj.content);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(postObj.image_url || null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setIsDeleting(true);

    try {
      // 이미지 삭제
      if (postObj.image_url) {
        try {
          const url = new URL(postObj.image_url);
          const fileName = url.pathname.split('/').pop();
          if (fileName) {
            await supabase.storage.from('post-image').remove([`posts/${fileName}`]);
          }
        } catch (err) {
          console.error('이미지 삭제 에러:', err);
        }
      }

      const { error } = await supabase.from('posts').delete().eq('id', postObj.id);
      if (error) throw error;

      if (onDelete) onDelete(postObj.id);
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditToggle = () => {
    setEdit(!edit);
    setNewContent(postObj.content);
    setImagePreview(postObj.image_url || null);
    setNewImage(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${currentUser.id}_${Date.now()}.${ext}`;
      const filePath = `posts/${fileName}`;

      const { error } = await supabase.storage.from('post-image').upload(filePath, file);
      if (error) throw error;

      const { data } = supabase.storage.from('post-image').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      return null;
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      let imageUrl = postObj.image_url;

      if (newImage) {
        const uploadedUrl = await uploadImage(newImage);
        if (!uploadedUrl) {
          alert('이미지 업로드 실패');
          setIsUpdating(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // updated_at 제거
      const { data, error } = await supabase
        .from('posts')
        .update({
          content: newContent,
          image_url: imageUrl,
        })
        .eq('id', postObj.id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('업데이트된 데이터가 없습니다.');

      if (onUpdate) onUpdate(data[0] as PostData);
      setEdit(false);
    } catch (err) {
      console.error('업데이트 실패:', err);
      alert('업데이트 실패');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const removeImagePreview = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  // 이메일 문자열에 따라 일정하게 색상 생성
  const getRandomColor = (str?: string) => {
    if (!str) return '#888'; // 기본 색
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  };

  return (
    <Card className='w-full'>
      <CardContent className='p-4'>
        {edit ? (
          <form onSubmit={handleUpdate} className='space-y-4'>
            <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} required />
            <Input type='file' accept='image/*' onChange={handleFileSelect} />
            <Button
              type='button'
              variant='destructive'
              size='sm'
              onClick={removeImagePreview}
              className='absolute top-2 right-2'
            >
              ✕
            </Button>
            {imagePreview && <img src={imagePreview} className='max-w-25 max-h-30 rounded-lg' />}
            <div className='flex gap-2'>
              <Button type='submit' disabled={isUpdating}>
                {isUpdating ? '저장 중...' : '저장'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={handleEditToggle}
                disabled={isUpdating}
              >
                취소
              </Button>
            </div>
          </form>
        ) : (
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center gap-2'>
                {/* 랜덤 색 동그라미 */}
                <div
                  className={`w-8 h-8 rounded-full text-center p-1 text-white font-medium `}
                  style={{ backgroundColor: getRandomColor(postObj.user_email) }}
                >
                  {postObj.user_email?.charAt(0).toUpperCase() || 'U'}
                </div>

                {/* 사용자 이름 + 날짜 */}
                <div>
                  <p className='text-sm font-medium'>{postObj.user_email || '익명 사용자'}</p>
                  <p className='text-xs text-gray-500'>{formatDate(postObj.created_at)}</p>
                </div>
              </div>
              {isOwner && (
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleEditToggle}
                    disabled={isDeleting}
                  >
                    수정
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? '삭제 중...' : '삭제'}
                  </Button>
                </div>
              )}
            </div>

            <p className='whitespace-pre-wrap break-words'>{postObj.content}</p>
            {postObj.image_url && (
              <img src={postObj.image_url} className='max-w-25 max-h-30 rounded-lg' />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
