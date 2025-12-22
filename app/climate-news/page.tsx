"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, ExternalLink, TrendingUp } from "lucide-react"

// Sample news data structure - in production, this would come from an API or RSS feed
const newsArticles = [
  {
    id: 1,
    title: "Chiayi's new pheasant-tailed jacana habitat shows promise",
    excerpt: "First nesting attempt signals potential though heavy rain halts hatching",
    date: "Nov. 26, 2025",
    tags: ["Agriculture", "Climate Change", "Wildlife"],
    link: "https://www.taiwannews.com.tw/en/news/6252805",
  },
  {
    id: 2,
    title: "At COP30 India and Taiwan can turn exclusion into partnership",
    excerpt: "Finance, technology, and standards offer practical paths for joint climate work",
    date: "Nov. 18, 2025",
    tags: ["COP30", "Taiwan-India", "Climate Policy"],
    link: "https://www.taiwannews.com.tw/en/news/6246771",
  },
  {
    id: 3,
    title: "October heat breaks records across Taiwan",
    excerpt: "11 lowland stations reached highest monthly average for the month since 1951",
    date: "Nov. 8, 2025",
    tags: ["Global Warming", "Taiwan Climate", "Temperature Records"],
    link: "https://www.taiwannews.com.tw/en/news/6239473",
  },
  {
    id: 4,
    title: "Taiwan government debates plans for heat 'holidays'",
    excerpt: "Legislators propose classifying extreme heat as hazardous weather under Meteorological Act",
    date: "Nov. 4, 2025",
    tags: ["Climate Policy", "Public Health", "Extreme Weather"],
    link: "https://www.taiwannews.com.tw/en/news/6235123",
  },
  {
    id: 5,
    title: "Taipei to host 'March for Climate' on Saturday",
    excerpt: "NGOs call for urgent action and national climate resilience",
    date: "Oct. 30, 2025",
    tags: ["Climate Action", "Environmental Justice", "Activism"],
    link: "https://www.taiwannews.com.tw/en/news/6231895",
  },
  {
    id: 6,
    title: "Developing countries accuse rich of broken climate promises at UN",
    excerpt: "Somalia says climate change forces 'impossible' financial trade-offs in developing countries",
    date: "Sep. 30, 2025",
    tags: ["UN Climate Conference", "Climate Finance", "Global Justice"],
    link: "https://www.taiwannews.com.tw/en/news/6210418",
  },
  {
    id: 7,
    title: "CBAM a gateway for future EU-Taiwan relations",
    excerpt: "Carbon Border Adjustment Mechanism tackles climate change by pricing carbon emissions",
    date: "Sep. 6, 2025",
    tags: ["CBAM", "European Union", "Carbon Pricing"],
    link: "https://www.taiwannews.com.tw/en/news/6195091",
  },
  {
    id: 8,
    title: "Taiwan to form extreme heat alliance",
    excerpt: "Group to develop heat response strategies and release cooling centers map",
    date: "May. 16, 2025",
    tags: ["Extreme Heat", "Carbon Fee", "Public Health"],
    link: "https://www.taiwannews.com.tw/en/news/6112483",
  },
]

export default function ClimateNews() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(newsArticles.flatMap((article) => article.tags)))

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || article.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <div className="flex-1 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Climate News</h1>
          <p className="text-lg text-muted-foreground">
            Latest updates on climate change, environmental policy, and sustainability
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All Topics
            </Button>
            {allTags.slice(0, 8).map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* News Source Attribution */}
        <Card className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <p className="text-sm text-emerald-900 dark:text-emerald-100">
                <strong>News Source:</strong> Climate change articles sourced from Taiwan News
              </p>
              <a
                href="https://www.taiwannews.com.tw/topic/Climate%20Change"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 mt-1"
              >
                Visit Taiwan News Climate Change Section
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>

                <h2 className="text-xl font-semibold mb-3 text-foreground line-clamp-2">{article.title}</h2>

                <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{article.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  Read full article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This page displays curated climate news content. All articles link to their original
            sources. For real-time updates, please visit the source directly at Taiwan News.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
