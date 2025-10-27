'use client'

import { useState } from 'react'
import { UploadCloud, ImageIcon, Video, Loader2, X, ArrowLeft } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const communities = [
  { id: 'lofi', name: 'Lo-Fi Lounge' },
  { id: 'indie', name: 'Indie Artists Unite' },
  { id: 'techno', name: 'Techno Underground' },
  { id: 'dj', name: 'DJ Collective' },
  { id: 'rising', name: 'Rising Stars' },
]

const postTypes = [
  'Concert',
  'Party',
  'Club',
  'Cover Song',
  'Original Track',
  'Jam Session',
]

export default function PostPage() {
  const [files, setFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [caption, setCaption] = useState('')
  const [postType, setPostType] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [location, setLocation] = useState('')
  const [songUrl, setSongUrl] = useState('')
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [friendZone, setFriendZone] = useState(false)
  const [communityFeed, setCommunityFeed] = useState(false)
  const [privateCloud, setPrivateCloud] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files ? Array.from(e.target.files) : []
    if (uploaded.length + files.length > 10) {
      alert('You can upload up to 10 photos.')
      return
    }
    const newPreviews = uploaded.map((file) => URL.createObjectURL(file))
    setFiles((prev) => [...prev, ...uploaded])
    setPreviewUrls((prev) => [...prev, ...newPreviews])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !hashtags.includes(newTag)) {
      setHashtags([...hashtags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleUpload = async () => {
    if (!files.length) return alert('Please upload at least one photo or video.')

    setUploading(true)
    setProgress(20)
    await new Promise((r) => setTimeout(r, 1000))
    setProgress(60)
    await new Promise((r) => setTimeout(r, 1000))
    setProgress(100)

    const isVideo = files[0].type.startsWith('video')

    setTimeout(() => {
      setUploading(false)
      alert(
        `Posted ${isVideo ? 'video' : 'photo'} to ${
          friendZone ? 'Friend Zone' : communityFeed ? 'Community' : 'Feed'
        }${privateCloud ? ' and saved in Private Cloud' : ''}!`
      )
      router.push(friendZone ? '/friend-zone' : isVideo ? '/reels' : '/')
    }, 500)
  }

  return (
    <main className="min-h-screen w-full bg-black text-white flex justify-center items-start py-10 px-4 pb-32">
      <div className="w-full max-w-2xl rounded-2xl border border-[#024c46]/30 shadow-lg bg-[#012624]">
        {/* Header */}
        <div className="p-6 border-b border-[#024c46]/30">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push("/")}
              className="bg-[#024c46]/70 p-2 rounded-full hover:bg-[#024c46] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Create a New Post</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-[#024c46]/60 rounded-xl p-8 text-center cursor-pointer hover:bg-[#024c46]/10 transition"
            onClick={() => document.getElementById('uploadInput')?.click()}
          >
            {previewUrls.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {previewUrls.map((url, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden">
                    {files[i].type.startsWith('video') ? (
                      <video src={url} className="w-full h-[140px] object-cover bg-black" controls />
                    ) : (
                      <Image src={url} alt="Preview" width={160} height={140} className="object-cover w-full h-[140px]" />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(i)
                      }}
                      className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud className="w-12 h-12 mb-3 text-green-400" />
                <p className="text-white mb-2">Click or drag photo/video here</p>
                <p className="text-sm">(up to 10 photos)</p>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1.5"><ImageIcon size={14}/> Photo</span>
                  <span className="flex items-center gap-1.5"><Video size={14}/> Video</span>
                </div>
              </div>
            )}
            <input
              id="uploadInput"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            rows={4}
          />

          {/* Post Type */}
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select post type (Concert, Party, etc.)</option>
            {postTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Hashtags */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Add Hashtags</label>
            <div className="flex gap-2">
              <input
                placeholder="Type hashtag (no # needed)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button 
                onClick={handleAddTag}
                className="px-6 py-2 bg-[#024c46] hover:bg-[#024c46]/80 rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Location */}
          <input
            placeholder="Add location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Song URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-green-400">🎵</span>
              Add a Song (Link)
            </label>
            <input
              type="url"
              placeholder="Paste audio URL (e.g., https://soundcloud.com/...)"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              className="w-full bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <p className="text-xs text-gray-500">
              Add a link to a song that will play when someone clicks the music button on your post
            </p>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center justify-between border border-[#024c46]/50 rounded-lg p-4 bg-[#024c46]/20">
              <label className="text-sm font-medium">Friend Zone</label>
              <button
                onClick={() => setFriendZone(!friendZone)}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  friendZone ? "bg-green-400" : "bg-gray-600"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                  friendZone && "translate-x-5"
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between border border-[#024c46]/50 rounded-lg p-4 bg-[#024c46]/20">
              <label className="text-sm font-medium">Community</label>
              <button
                onClick={() => setCommunityFeed(!communityFeed)}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  communityFeed ? "bg-green-400" : "bg-gray-600"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                  communityFeed && "translate-x-5"
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between border border-[#024c46]/50 rounded-lg p-4 bg-[#024c46]/20 col-span-2">
              <label className="text-sm font-medium">Private Cloud</label>
              <button
                onClick={() => setPrivateCloud(!privateCloud)}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  privateCloud ? "bg-green-400" : "bg-gray-600"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                  privateCloud && "translate-x-5"
                )} />
              </button>
            </div>
          </div>

          {/* Community Picker */}
          {communityFeed && (
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full bg-[#024c46]/30 border border-[#024c46]/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select community</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}

          {/* Upload Button */}
          <button
            className={cn(
              "w-full rounded-xl py-3 font-semibold transition-colors",
              uploading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-green-400 hover:bg-green-500 text-black"
            )}
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18}/>
                Posting...
              </span>
            ) : (
              'Post'
            )}
          </button>

          {uploading && (
            <div className="mt-2">
              <Progress value={progress} className="h-2 bg-gray-700">
                <div 
                  className="h-full bg-green-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

