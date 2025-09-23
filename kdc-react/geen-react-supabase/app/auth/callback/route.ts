import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")

  if (error) {
    console.error("[v0] OAuth callback error:", error, errorDescription)
    const errorParam = error === "access_denied" ? "access_denied" : "oauth_error"
    const redirectUrl = `${requestUrl.origin}/auth/login?error=${errorParam}`
    if (errorDescription) {
      return NextResponse.redirect(`${redirectUrl}&error_description=${encodeURIComponent(errorDescription)}`)
    }
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      },
    )

    try {
      console.log("[v0] Exchanging code for session")
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("[v0] OAuth session exchange error:", error)
        return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=callback_error`)
      }

      if (data.user) {
        console.log("[v0] OAuth login successful for user:", data.user.email)
        return NextResponse.redirect(`${requestUrl.origin}/`)
      }
    } catch (err) {
      console.error("[v0] OAuth callback exception:", err)
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=callback_error`)
    }
  }

  console.warn("[v0] OAuth callback called without code parameter")
  return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=callback_error`)
}
