"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function OAuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const error = searchParams.get("error")
        if (error) {
          throw new Error("OAuth authentication failed")
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (session) {
          console.log("[v0] OAuth login successful, redirecting to home")
          router.replace("/")
        } else {
          console.log("[v0] No session found, redirecting to login")
          router.replace("/auth/login")
        }
      } catch (err: any) {
        console.error("[v0] OAuth callback error:", err.message)
        router.replace("/auth/login?error=callback_error")
      } finally {
        setIsLoading(false)
      }
    }

    handleCallback()
  }, [router, searchParams, supabase])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>로그인 처리 중...</p>
        </div>
      </div>
    )
  }

  return null
}
