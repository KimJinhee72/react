"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface PostProps {
  postObj: {
    id: string
    content: string
    image_url?: string
    user_id: string
    user_email?: string
    created_at: string
  }
  isOwner: boolean
  currentUser: any
}

export default function Post({ postObj, isOwner, currentUser }: PostProps) {
  const [edit, setEdit] = useState(false)
  const [newContent, setNewContent] = useState(postObj.content)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?")
    if (!confirmed) return

    setIsDeleting(true)

    try {
      console.log("[v0] Deleting post:", postObj.id)

      if (postObj.image_url) {
        try {
          // Extract file path from URL
          const url = new URL(postObj.image_url)
          const pathParts = url.pathname.split("/")
          const fileName = pathParts[pathParts.length - 1]
          const filePath = `posts/${fileName}`

          console.log("[v0] Deleting image:", filePath)

          const { error: storageError } = await supabase.storage.from("posts").remove([filePath])

          if (storageError) {
            console.error("[v0] Error deleting image:", storageError)
          }
        } catch (imageError) {
          console.error("[v0] Error processing image deletion:", imageError)
        }
      }

      const { error } = await supabase.from("posts").delete().eq("id", postObj.id)

      if (error) throw error

      console.log("[v0] Post deleted successfully")
    } catch (error) {
      console.error("[v0] Delete error:", error)
      alert("삭제에 실패했습니다.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    setEdit(!edit)
    setNewContent(postObj.content) // Reset content when canceling
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newContent.trim()) return

    setIsUpdating(true)

    try {
      console.log("[v0] Updating post:", postObj.id)

      const { error } = await supabase
        .from("posts")
        .update({
          content: newContent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", postObj.id)

      if (error) throw error

      console.log("[v0] Post updated successfully")
      setEdit(false)
    } catch (error) {
      console.error("[v0] Update error:", error)
      alert("수정에 실패했습니다.")
    } finally {
      setIsUpdating(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {edit ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              value={newContent}
              onChange={onChange}
              required
              placeholder="포스트 내용을 입력하세요..."
              className="w-full"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating || !newContent.trim()} size="sm">
                {isUpdating ? "저장 중..." : "저장"}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleEdit} disabled={isUpdating}>
                취소
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Post header with user info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {postObj.user_email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{postObj.user_email || "익명 사용자"}</p>
                  <p className="text-xs text-gray-500">{formatDate(postObj.created_at)}</p>
                </div>
              </div>

              {isOwner && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEdit} disabled={isDeleting}>
                    수정
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "삭제 중..." : "삭제"}
                  </Button>
                </div>
              )}
            </div>

            {/* Post content */}
            <div className="space-y-3">
              <p className="text-gray-900 whitespace-pre-wrap break-words leading-relaxed">{postObj.content}</p>

              {postObj.image_url && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={postObj.image_url || "/placeholder.svg"}
                    alt="포스트 이미지"
                    className="w-full max-h-96 object-cover"
                    onError={(e) => {
                      console.error("[v0] Image load error:", postObj.image_url)
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
