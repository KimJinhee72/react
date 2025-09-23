"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Post from "@/components/Post"

interface PostData {
  id: string
  content: string
  created_at: string
  user_id: string
  user_email?: string
  image_url?: string
}

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<PostData[]>([])
  const [newPost, setNewPost] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          console.log("[v0] No authenticated user, redirecting to login")
          router.push("/auth/login")
          return
        }

        console.log("[v0] User authenticated:", user.email)
        setUser(user)
        await fetchPosts()
      } catch (error) {
        console.error("[v0] Auth check error:", error)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[v0] Auth state changed:", event)
      if (event === "SIGNED_OUT") {
        router.push("/auth/login")
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
        fetchPosts()
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const fetchPosts = async () => {
    try {
      console.log("[v0] Fetching posts from database")

      // Initial fetch
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching posts:", error)
        return
      }

      console.log("[v0] Posts fetched:", data?.length || 0)
      setPosts(data || [])

      const subscription = supabase
        .channel("posts_channel")
        .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, (payload) => {
          console.log("[v0] Real-time update:", payload)

          if (payload.eventType === "INSERT") {
            setPosts((prev) => [payload.new as PostData, ...prev])
          } else if (payload.eventType === "DELETE") {
            setPosts((prev) => prev.filter((post) => post.id !== payload.old.id))
          } else if (payload.eventType === "UPDATE") {
            setPosts((prev) => prev.map((post) => (post.id === payload.new.id ? (payload.new as PostData) : post)))
          }
        })
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("[v0] Error in fetchPosts:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}_${Date.now()}.${fileExt}`
      const filePath = `posts/${fileName}`

      console.log("[v0] Uploading image:", filePath)

      const { data, error } = await supabase.storage.from("posts").upload(filePath, file)

      if (error) {
        console.error("[v0] Image upload error:", error)
        return null
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(filePath)

      console.log("[v0] Image uploaded successfully:", publicUrl)
      return publicUrl
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPost.trim() || !user) return

    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting new post")

      let imageUrl = null

      // Upload image if selected
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
        if (!imageUrl) {
          alert("이미지 업로드에 실패했습니다.")
          setIsSubmitting(false)
          return
        }
      }

      // Insert post into database
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            content: newPost,
            user_id: user.id,
            user_email: user.email,
            image_url: imageUrl,
          },
        ])
        .select()

      if (error) {
        console.error("[v0] Error creating post:", error)
        alert("포스트 작성에 실패했습니다.")
        return
      }

      console.log("[v0] Post created successfully:", data)

      // Reset form
      setNewPost("")
      setSelectedFile(null)
      setImagePreview(null)

      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("[v0] Error in handleSubmit:", error)
      alert("포스트 작성 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      console.log("[v0] Logging out user")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("[v0] Logout error:", error)
      } else {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("[v0] Error during logout:", error)
    }
  }

  const removeImagePreview = () => {
    setSelectedFile(null)
    setImagePreview(null)
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">소셜 미디어</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">안녕하세요, {user?.email}님</span>
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>새 포스트 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="무슨 일이 일어나고 있나요?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
                required
              />

              <div className="flex items-center gap-4">
                <Input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} className="flex-1" />
                <Button type="submit" disabled={isSubmitting || !newPost.trim()} className="px-8">
                  {isSubmitting ? "등록 중..." : "등록"}
                </Button>
              </div>

              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="미리보기"
                    className="max-w-xs max-h-48 rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImagePreview}
                    className="absolute top-2 right-2"
                  >
                    ✕
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">포스트 목록 ({posts.length})</h2>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                아직 포스트가 없습니다. 첫 번째 포스트를 작성해보세요!
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Post key={post.id} postObj={post} isOwner={post.user_id === user?.id} currentUser={user} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
