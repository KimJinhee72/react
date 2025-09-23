'use client';

import type React from 'react';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      setIsLoading(false);
      return;
    }

    try {
      console.log('[v0] Attempting signup with email:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      console.log('[v0] Signup successful, redirecting to success page');

      localStorage.setItem('signup_email', email);

      router.push('/auth/signup-success');
    } catch (error: unknown) {
      console.error('[v0] Signup error:', error);
      setError(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'kakao' | 'naver') => {
    setError(null);

    try {
      console.log(`[v0] Attempting ${provider} login`);

      const providerOptions: Record<string, any> = {
        google: { queryParams: { access_type: 'offline', prompt: 'consent' } },
        github: { queryParams: { scope: 'user:email' } },
        kakao: { queryParams: { scope: 'profile_nickname,profile_image' } },
        naver: { queryParams: { scope: 'name,profile_image' } },
      };

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          ...providerOptions[provider],
        },
      });

      // 이메일 없는 테스트 계정 처리
      if (error) {
        console.warn(`[v0] ${provider} OAuth warning:`, error);

        if (provider === 'kakao' && error.message.includes('user email')) {
          console.log('[v0] Kakao 로그인: 이메일 없음, 테스트용 임시 처리');
          // 테스트용: 이메일 없는 사용자 로그인 흐름 진행 가능
          alert('테스트용 카카오 계정: 이메일이 없어 로그인 시 일부 정보만 제공됩니다.');
          return;
        }

        throw error;
      }

      console.log(`[v0] ${provider} OAuth initiated successfully`, data);
    } catch (err: any) {
      console.error(`[v0] ${provider} login error:`, err);

      if (err.message?.includes('회원가입을 하세요')) {
        setError(
          `${provider} 로그인이 설정되지 않았습니다. Supabase 대시보드에서 ${provider} OAuth를 활성화해주세요.`
        );
      } else if (err.message?.includes('OAuth provider not supported')) {
        setError(`${provider} 로그인이 지원되지 않습니다. 관리자에게 문의하세요.`);
      } else {
        setError(err.message || `${provider} 로그인 실패`);
      }
    }
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>회원가입</CardTitle>
            <CardDescription>새 계정을 만드세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>이메일</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='example@email.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>비밀번호</Label>
                  <Input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='confirmPassword'>비밀번호 확인</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && <p className='text-sm text-red-500'>{error}</p>}
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? '계정 생성 중...' : '회원가입'}
                </Button>
              </div>
            </form>

            <div className='mt-4 flex flex-col gap-3'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>또는</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <Button
                  variant='outline'
                  onClick={() => handleSocialLogin('google')}
                  className='w-full'
                >
                  <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                    <path
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      fill='#4285F4'
                    />
                    <path
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      fill='#34A853'
                    />
                    <path
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      fill='#EA4335'
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant='outline'
                  onClick={() => handleSocialLogin('github')}
                  className='w-full'
                >
                  <svg className='mr-2 h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                  GitHub
                </Button>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <Button
                  variant='outline'
                  onClick={() => handleSocialLogin('kakao')}
                  className='w-full bg-yellow-300 hover:bg-yellow-400 text-black border-yellow-300'
                >
                  <span className='mr-2 text-sm font-bold'>K</span>
                  카카오
                </Button>

                <Button
                  variant='outline'
                  onClick={() => handleSocialLogin('naver')}
                  className='w-full bg-green-500 hover:bg-green-600 text-white border-green-500'
                >
                  <span className='mr-2 text-sm font-bold'>N</span>
                  네이버
                </Button>
              </div>
            </div>

            <div className='mt-4 text-center text-sm'>
              이미 계정이 있으신가요?{' '}
              <Link href='/auth/login' className='underline underline-offset-4'>
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
