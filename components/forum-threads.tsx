"use client"

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Pin, Eye } from 'lucide-react'

const threads = [
  {
    id: 1,
    title: 'How to reduce home energy consumption by 30%',
    author: 'Sarah Chen',
    avatar: '/diverse-profile-avatars.png',
    category: 'Carbon Reduction Tips',
    excerpt: 'Share your experiences and strategies for reducing energy usage at home. I recently switched to LED bulbs and smart thermostats...',
    replies: 24,
    views: 342,
    likes: 18,
    isPinned: true,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'Best electric vehicles for under $40k',
    author: 'Mike Johnson',
    avatar: '/profile-avatar-electric.jpg',
    category: 'Carbon Reduction Tips',
    excerpt: 'Discussing affordable EV options and their real-world performance. Has anyone tried the latest models?',
    replies: 18,
    views: 267,
    likes: 12,
    isPinned: false,
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    title: 'New study shows carbon removal technology breakthrough',
    author: 'Dr. Patel',
    avatar: '/science-avatar.png',
    category: 'Climate Trends',
    excerpt: 'Researchers have developed a new method to capture CO2 from the atmosphere more efficiently...',
    replies: 31,
    views: 512,
    likes: 45,
    isPinned: true,
    timestamp: '1 day ago',
  },
  {
    id: 4,
    title: 'Starting a community garden in your neighborhood',
    author: 'Emma Wilson',
    avatar: '/profile-avatar-garden.jpg',
    category: 'Community Projects',
    excerpt: 'Tips and resources for organizing community gardens. I just completed my first project and would love to share lessons learned!',
    replies: 14,
    views: 189,
    likes: 22,
    isPinned: false,
    timestamp: '2 days ago',
  },
]

export function ForumThreads() {
  const [selectedThread, setSelectedThread] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Discussions</h2>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors">
          Start Discussion
        </button>
      </div>

      {threads.map((thread) => (
        <div
          key={thread.id}
          onClick={() => setSelectedThread(thread.id)}
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
        >
          {/* Pin indicator */}
          {thread.isPinned && (
            <div className="flex items-center gap-1 text-primary text-xs font-semibold mb-2">
              <Pin className="w-3 h-3" />
              PINNED
            </div>
          )}

          {/* Title and metadata */}
          <div className="flex gap-4">
            <img
              src={thread.avatar || "/placeholder.svg"}
              alt={thread.author}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">
                {thread.title}
              </h3>
              <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground flex-wrap">
                <span className="font-medium text-foreground">{thread.author}</span>
                <span>•</span>
                <span>{thread.category}</span>
                <span>•</span>
                <span>{thread.timestamp}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {thread.excerpt}
              </p>

              {/* Stats and actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{thread.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{thread.views} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{thread.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Load more */}
      <button className="w-full py-3 text-primary font-medium hover:bg-accent/30 rounded-lg transition-colors mt-6">
        Load More Discussions
      </button>
    </div>
  )
}
