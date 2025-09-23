'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Post from '@/components/Post';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) return router.push('/auth/login');
        setUser(user);
        fetchPosts();
      } catch {
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') router.push('/auth/login');
      else if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        fetchPosts();
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('[HomePage] fetchPosts error:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `post-image/${fileName}`;
    const { data, error } = await supabase.storage.from('post-image').upload(filePath, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('post-image').getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([
          { content: newPost, user_id: user.id, user_email: user.email, image_url: imageUrl },
        ])
        .select();

      if (error) throw error;
      if (data) setPosts((prev) => [data[0], ...prev]);
      setNewPost('');
      setSelectedFile(null);
      setImagePreview(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('[HomePage] handleSubmit error:', err);
      alert('포스트 작성 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const handleUpdatePost = (updatedPost: any) => {
    setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  if (isLoading) return <p className='text-center mt-8'>로딩 중...</p>;

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-4xl mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>소셜 미디어 – 나만의 소식 공유</h1>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600'>안녕하세요, {user?.email}님</span>
            <Button variant='outline' onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className='max-w-4xl mx-auto px-4 py-8'>
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>새 포스트 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder='무슨 일이 일어나고 있나요?'
                className='min-h-[100px]'
                required
              />
              <input id='file-input' type='file' accept='image/*' onChange={handleFileSelect} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt='미리보기'
                  className='max-w-xs max-h-48 rounded-lg border'
                />
              )}
              <Button type='submit' disabled={isSubmitting || !newPost.trim()}>
                {isSubmitting ? '등록 중...' : '등록'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className='space-y-4'>
          {posts.map((post) => (
            <Post
              key={post.id}
              postObj={post}
              isOwner={post.user_id === user?.id}
              currentUser={user}
              onUpdate={handleUpdatePost} // 목록 갱신
            />
          ))}
        </div>
      </main>
    </div>
  );
}
