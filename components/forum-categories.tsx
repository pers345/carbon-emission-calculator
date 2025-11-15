"use client"

import { MessageSquare, TrendingUp, Lightbulb, Users, Globe } from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Discussions', icon: MessageSquare, count: 248 },
  { id: 'tips', name: 'Carbon Reduction Tips', icon: Lightbulb, count: 92 },
  { id: 'trends', name: 'Climate Trends', icon: TrendingUp, count: 45 },
  { id: 'community', name: 'Community Projects', icon: Users, count: 67 },
  { id: 'news', name: 'Global News', icon: Globe, count: 156 },
]

export function ForumCategories() {
  return (
    <div className="sticky top-20 space-y-2">
      <h3 className="font-semibold text-foreground mb-4">Categories</h3>
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.id}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors text-left text-sm"
          >
            <Icon className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <div className="font-medium text-foreground">{category.name}</div>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{category.count}</span>
          </button>
        )
      })}
    </div>
  )
}
