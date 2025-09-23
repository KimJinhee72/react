'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function SignUpSuccessPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isResending, setIsResending] = useState(false);

  const handleResendConfirmation = async () => {
    setIsResending(true);
    try {
      // Get email from URL params or localStorage if available
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email') || localStorage.getItem('signup_email');

      if (email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
              `${window.location.origin}/auth/login`,
          },
        });

        if (error) {
          alert('이메일 재전송에 실패했습니다.');
        } else {
          alert('확인 이메일이 재전송되었습니다.');
        }
      }
    } catch (error) {
      console.error('이메일 재전송 오류:', error);
      alert('이메일 재전송에 실패했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>회원가입이 완료되었습니다!</CardTitle>
            <CardDescription>이메일을 확인해주세요</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              회원가입이 성공적으로 완료되었습니다. 로그인하기 전에 이메일을 확인하여 계정을
              인증해주세요.
            </p>

            <div className='space-y-2'>
              <Button
                onClick={handleResendConfirmation}
                variant='outline'
                className='w-full bg-transparent'
                disabled={isResending}
              >
                {isResending ? '전송 중...' : '확인 이메일 재전송'}
              </Button>

              <Button onClick={handleGoToLogin} className='w-full'>
                로그인 페이지로 이동
              </Button>
            </div>

            <p className='text-xs text-muted-foreground text-center'>
              이메일을 받지 못하셨나요? 스팸 폴더를 확인해보세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
